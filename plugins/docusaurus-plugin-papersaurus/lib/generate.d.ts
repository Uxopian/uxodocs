/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PapersaurusPluginOptions } from './types';
import { Props } from '@docusaurus/types';
export declare function generatePdfFiles(outDir: string, pluginOptions: PapersaurusPluginOptions, { siteConfig, plugins }: Props): Promise<void>;
