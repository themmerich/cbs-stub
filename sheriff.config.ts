import {noDependencies, sameTag, SheriffConfig} from '@softarc/sheriff-core';

/**
  * Minimal configuration for Sheriff
  * Assigns the 'noTag' tag to all modules and
  * allows all modules to depend on each other.
  */

export const config: SheriffConfig = {
  entryFile: 'src/main.ts',
  enableBarrelLess: true,
  modules: {
    'src/app': {
      'core/feat-<name>': ['core', 'type:feature'],
      'core/<type>': ['core', 'type:<type>'],
      'features/feat-<name>': ['cbs', 'type:feature'],
      'features/<type>': ['cbs', 'type:<type>'],
      'shared/<type>': ['shared', 'type:<type>'],
    }
  },
  depRules: {
    root: ['type:api', 'core', 'shared', ({ to }) => to.startsWith('cbs')],
    core: [sameTag, 'shared', 'root', 'noTag'],
    cbs: [sameTag, 'shared', 'root', 'noTag'],
    'type:api': ['type:feature', 'type:ui'],
    'type:feature': ['type:model', 'type:ui', 'type:data'],
    'type:data': ['type:model', 'root'],
    'type:ui': ['type:model'],
    'type:model': noDependencies,
    shared: ['shared', 'root']
  },
};
