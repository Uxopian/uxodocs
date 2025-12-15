import { Joi } from "@docusaurus/utils-validation";
import { PluginOptions, PapersaurusPluginOptions } from "./types";
declare type ValidateFn = (schema: Joi.Schema, options: PluginOptions | undefined) => Required<PluginOptions>;
export declare function validateOptions({ options, validate, }: {
    options: PluginOptions | undefined;
    validate: ValidateFn;
}): Required<PluginOptions>;
export declare function processOptions(options: PluginOptions | undefined): PapersaurusPluginOptions;
export {};
