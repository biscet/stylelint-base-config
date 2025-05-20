import maxNestingDepth from './max-nesting-depth/max-nesting-depth';
import noHardcodedColors from './no-hardcoded-colors/no-hardcoded-colors';
import noLiteralZIndex from './no-literal-z-index/no-literal-z-index';
import noExtend from './no-extend/no-extend';
import maxControlNesting from './max-control-nesting/max-control-nesting';
import noImportant from './no-important-except-utilities/no-important-except-utilities';

export default [
  maxNestingDepth, noHardcodedColors,
  noLiteralZIndex, noExtend, maxControlNesting,
  noImportant
] as const;