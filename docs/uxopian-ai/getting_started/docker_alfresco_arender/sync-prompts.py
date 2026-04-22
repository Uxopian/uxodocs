#!/usr/bin/env python3
"""
sync-prompts.py [--overwrite] <uxopian_ai_url> <prompts_yml>

Reads the global prompts from prompts.yml and pushes them to Uxopian AI.

Without --overwrite: only creates missing prompts (POST); skips existing ones.
With    --overwrite: creates missing prompts (POST) and updates existing ones (PUT).

Usage:
    python3 sync-prompts.py http://localhost:8085 config/prompts.yml
    python3 sync-prompts.py --overwrite http://localhost:8085 config/prompts.yml
"""

import sys
import json
import urllib.request
import urllib.error
import yaml  # pip install pyyaml

def main():
    args = sys.argv[1:]
    overwrite = "--overwrite" in args
    args = [a for a in args if a != "--overwrite"]

    if len(args) != 2:
        print(f"Usage: {sys.argv[0]} [--overwrite] <uxopian_ai_url> <prompts_yml>", file=sys.stderr)
        sys.exit(1)

    base_url = args[0].rstrip("/")
    prompts_file = args[1]

    with open(prompts_file, "r", encoding="utf-8") as f:
        config = yaml.safe_load(f)

    global_prompts = config.get("prompts", {}).get("globals", [])
    if not global_prompts:
        print("No global prompts found in YAML.")
        return

    headers = {
        "Content-Type": "application/json",
        "X-User-Id": "admin",
    }

    created = 0
    updated = 0
    skipped = 0
    errors = 0

    for prompt in global_prompts:
        prompt_id = prompt.get("id")
        if not prompt_id:
            continue

        payload = {
            "id": prompt_id,
            "role": prompt.get("role", "USER"),
            "content": prompt.get("content", ""),
        }
        for opt in ("defaultLlmProvider", "defaultLlmModel", "temperature",
                    "reasoningDisabled", "requiresMultiModalModel", "requiresFunctionCallingModel"):
            camel = opt
            snake = "".join(["_" + c.lower() if c.isupper() else c for c in opt]).lstrip("_")
            if camel in prompt:
                payload[camel] = prompt[camel]
            elif snake in prompt:
                payload[camel] = prompt[snake]

        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(f"{base_url}/api/v1/admin/prompts", data=data, headers=headers, method="POST")

        try:
            with urllib.request.urlopen(req) as resp:
                if resp.status in (200, 201):
                    print(f"  [OK]      Created: {prompt_id}")
                    created += 1
        except urllib.error.HTTPError as e:
            if e.code == 409 and overwrite:
                put_req = urllib.request.Request(
                    f"{base_url}/api/v1/admin/prompts",
                    data=data, headers=headers, method="PUT"
                )
                try:
                    with urllib.request.urlopen(put_req) as resp:
                        print(f"  [UPDATED] Updated:  {prompt_id}")
                        updated += 1
                except urllib.error.HTTPError as put_e:
                    body = put_e.read().decode("utf-8", errors="replace")
                    print(f"  [ERROR]   {prompt_id}: PUT HTTP {put_e.code} — {body}", file=sys.stderr)
                    errors += 1
                except Exception as put_e:
                    print(f"  [ERROR]   {prompt_id}: {put_e}", file=sys.stderr)
                    errors += 1
            elif e.code == 409:
                print(f"  [SKIP]    Already exists: {prompt_id}")
                skipped += 1
            else:
                body = e.read().decode("utf-8", errors="replace")
                print(f"  [ERROR]   {prompt_id}: HTTP {e.code} — {body}", file=sys.stderr)
                errors += 1
        except Exception as e:
            print(f"  [ERROR]   {prompt_id}: {e}", file=sys.stderr)
            errors += 1

    print(f"\nDone: {created} created, {updated} updated, {skipped} skipped, {errors} errors.")
    if errors:
        sys.exit(1)

if __name__ == "__main__":
    main()
