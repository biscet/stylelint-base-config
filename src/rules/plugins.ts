import maxNestingDepth from './max-nesting-depth/max-nesting-depth';
import noHardcodedColors from './no-hardcoded-colors/no-hardcoded-colors';
import noLiteralZIndex from './no-literal-z-index/no-literal-z-index';
import noExtend from './no-extend/no-extend';
import maxControlNesting from './max-control-nesting/max-control-nesting';

export default [
  maxNestingDepth, noHardcodedColors,
  noLiteralZIndex, noExtend, maxControlNesting
] as const;