import BushFactory from './bush-factory';
import MonkeyFactory from './monkey-factory';
import RockFactory from './rock-factory';
import TreeFactory from './tree-factory';

import KnifeFactory from './knife-factory';
import AxeFactory from './axe-factory';
import SpearFactory from './spear-factory';
import AppleFactory from './apple-factory';

export default {
    Bush: BushFactory,
    Monkey: MonkeyFactory,
    Stone: RockFactory('Stone'),
    Iron: RockFactory('Iron'),
    Silver: RockFactory('Silver'),
    Gold: RockFactory('Gold'),
    Tree: TreeFactory,

    StoneKnife: KnifeFactory('Stone'),
    IronKnife: KnifeFactory('Iron'),
    SilverKnife: KnifeFactory('Silver'),
    GoldKnife: KnifeFactory('Gold'),

    StoneAxe: AxeFactory('Stone'),
    IronAxe: AxeFactory('Iron'),
    SilverAxe: AxeFactory('Silver'),
    GoldAxe: AxeFactory('Gold'),

    StoneSpear: SpearFactory('Stone'),
    IronSpear: SpearFactory('Iron'),
    SilverSpear: SpearFactory('Silver'),
    GoldSpear: SpearFactory('Gold'),

    Apple: AppleFactory
};
