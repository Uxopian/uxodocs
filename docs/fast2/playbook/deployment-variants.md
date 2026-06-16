---
title: Deployment Variants
last_update:
  date: '2026-06-16T10:09:13.305Z'
  author: CI/CD Bot
sidebar_label: Deployment Variants
sidebar_position: 3
content_hash: e0f8947b653cc2ae381c1409f4b9fe94761d279d324081ff9eb3d5a70e88e212
---

# Deployment Variants

<div align="center">
<img src="/img/fast2-playbook/deployment-cover.png" alt="Fast2 deployment topology: a source ECM feeding Fast2 workers across on-premise and cloud, converging on the target ECM" width="820" />
</div>

Where you run Fast2 relative to the source and target systems is an architecture decision you make before the first campaign, and it shapes everything that follows: how much data leaves the building, how fast you go, and how hard the project is to debug. Fast2 supports four deployment shapes for a content-migration project. This article walks each one through the same three lenses — access control, performance, and debugging — using a FileNet-to-AWS-S3 migration as the running example.

## Option 1 — On-premise

Fast2 runs inside the customer's own network, alongside the source ECM. This is the most private option: the only traffic that leaves the perimeter is the connection to the destination, which in the FileNet-to-S3 example is the S3 link, already protected by AWS encryption in transit and at rest.

### Sub-option A — Same machine

<div style={{display:'flex',gap:'2rem',alignItems:'center',flexWrap:'wrap',margin:'1.5rem 0'}}>
<div style={{flex:'1 1 320px',minWidth:'300px'}}>

Fast2 is installed directly on the ECM server. The source is reached over localhost, so nothing about the document plane touches the network at all. The single external channel is the S3 connection.

This is maximally private, but Fast2 and the ECM now compete for the same CPU, memory, and I/O. On a busy production source that contention is exactly what you are trying to avoid (see [Extracting From a Live ECM](./extracting-from-live-ecm.md)). Reserve it for clones, staging copies, or sources with headroom to spare.

</div>
<div style={{flex:'1 1 380px',minWidth:'300px',textAlign:'center'}}>
<img src="/img/fast2-playbook/deployment_on-premise-b.png" alt="Fast2 deployed on the same machine as the source system" style={{width:'100%',maxWidth:'520px',height:'auto'}} />
</div>
</div>

### Sub-option B — Same network

<div style={{display:'flex',gap:'2rem',alignItems:'center',flexWrap:'wrap',margin:'1.5rem 0'}}>
<div style={{flex:'1 1 380px',minWidth:'300px',textAlign:'center'}}>
<img src="/img/fast2-playbook/deployment_on-premise-a.png" alt="Fast2 deployed on a secondary machine on the same network as the source ECM" style={{width:'100%',maxWidth:'520px',height:'auto'}} />
</div>
<div style={{flex:'1 1 320px',minWidth:'300px'}}>

Fast2 is installed on a separate server inside the enterprise network. You keep the privacy benefits of staying on-premise while isolating the migration workload from the ECM's own resources, which prevents resource contention and improves stability.

This is the on-premise default. Same trust boundary, no resource fight.

</div>
</div>

## Option 2 — Cloud-based

<div style={{display:'flex',gap:'2rem',alignItems:'center',flexWrap:'wrap',margin:'1.5rem 0'}}>
<div style={{flex:'1 1 320px',minWidth:'300px'}}>

Fast2 runs remotely, in the cloud. This cuts infrastructure cost and makes it trivial to scale workers up and down on demand. The trade-off is exposure: you have to open remote access from the cloud into both the source and the destination, which can raise confidentiality concerns and usually means VPN, peering, or firewall changes that the customer's security team has to approve.

Best when the source is itself cloud-hosted, or when the customer is comfortable opening controlled access and wants elastic scale.

</div>
<div style={{flex:'1 1 380px',minWidth:'300px',textAlign:'center'}}>
<img src="/img/fast2-playbook/deployment_on-cloud.png" alt="Fast2 deployed in the cloud, reaching back to the source and forward to the destination" style={{width:'100%',maxWidth:'520px',height:'auto'}} />
</div>
</div>

## Option 3 — Hybrid

<div style={{display:'flex',gap:'2rem',alignItems:'center',flexWrap:'wrap',margin:'1.5rem 0'}}>
<div style={{flex:'1 1 380px',minWidth:'300px',textAlign:'center'}}>
<img src="/img/fast2-playbook/deployment_hybrid.png" alt="Fast2 deployed in a hybrid topology: cloud broker, on-premise workers" style={{width:'100%',maxWidth:'520px',height:'auto'}} />
</div>
<div style={{flex:'1 1 320px',minWidth:'300px'}}>

The broker runs remotely while the workers run on-premise, next to the ECM. Sensitive document traffic stays internal — the workers read from the source locally — while the lightweight orchestration and queueing happen in the cloud. This balances the performance and scale of a cloud broker against the security of keeping the heavy, confidential data path inside the network.

The cost is operational complexity. With components split across two environments, debugging is harder: a failure could be in the cloud broker, the on-premise worker, or the link between them. Useful detail when planning: it is fairly easy to move to the hybrid architecture *from* either the "same network" on-premise or the fully remote cloud configuration, so you can start simpler and graduate to hybrid if you need to.

</div>
</div>

## Option 4 — AWS Snowball

<div style={{display:'flex',gap:'2rem',alignItems:'center',flexWrap:'wrap',margin:'1.5rem 0'}}>
<div style={{flex:'1 1 320px',minWidth:'300px'}}>

For very large estates or constrained bandwidth, data is transferred locally onto a physical AWS Snowball device, which is then shipped to AWS and loaded into S3. This preserves bandwidth and keeps the data confidential in transit (the device is encrypted and physically moved rather than streamed over the wire).

The trade-offs are physical: shipping introduces real-world delay, and scalability is limited by device capacity and the logistics of moving drives. Best for one-shot bulk seeding of a huge archive where the network would otherwise be the bottleneck.

</div>
<div style={{flex:'1 1 380px',minWidth:'300px',textAlign:'center'}}>
<img src="/img/fast2-playbook/deployment_aws-snowball.png" alt="Migration via AWS Snowball: data written locally to a physical device, then shipped to AWS" style={{width:'100%',maxWidth:'520px',height:'auto'}} />
</div>
</div>

## Quick comparison

| Factor | On-prem | Cloud | Hybrid | Snowball |
|---|---|---|---|---|
| **Access control** | ✅ | ❌ | ✅ | — |
| **Performance** | Mixed | ✅ | ✅ | ✅ |
| **Debugging** | ✅ | ✅ | ❌ | ✅ |
| **Scalability** | ❌ | ✅ | ✅ | ❌ |

## Key takeaway

There is no single right answer; the right shape depends on the customer's confidentiality requirements, available bandwidth, and appetite for operational complexity. One practical note worth remembering: it is pretty easy to switch from both the "same network" and the "remote" configurations to the hybrid architecture, so you are not locked in by your first choice.
