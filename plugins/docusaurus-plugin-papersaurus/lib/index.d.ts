/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LoadContext, Plugin } from '@docusaurus/types';
import { PluginOptions } from './types';
export default function (_context: LoadContext, options?: PluginOptions): Plugin<void>;
export { validateOptions } from "./validateOptions";
