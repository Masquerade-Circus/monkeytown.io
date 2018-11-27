import BushFactory from './bush-factory';
import MonkeyFactory from './monkey-factory';
import RockFactory from './rock-factory';
import TreeFactory from './tree-factory';

import KnifeFactory from './knife-factory';

export default {
    Bush: BushFactory,
    Monkey: MonkeyFactory,
    Stone: RockFactory('Stone'),
    Iron: RockFactory('Iron'),
    Silver: RockFactory('Silver'),
    Gold: RockFactory('Gold'),
    Tree: TreeFactory,
    Knife: KnifeFactory
};
