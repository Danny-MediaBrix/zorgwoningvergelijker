import type { ComponentType } from "react";
import IllustrationTinyHouse from "./IllustrationTinyHouse";
import IllustrationMicroWoning from "./IllustrationMicroWoning";
import IllustrationMantelzorgwoning from "./IllustrationMantelzorgwoning";
import IllustrationKangoeroewoning from "./IllustrationKangoeroewoning";
import IllustrationChalet from "./IllustrationChalet";
import IllustrationLodge from "./IllustrationLodge";
import IllustrationVakantiebungalow from "./IllustrationVakantiebungalow";
import IllustrationPrefabWoning from "./IllustrationPrefabWoning";
import IllustrationSysteemwoning from "./IllustrationSysteemwoning";
import IllustrationFlexwoning from "./IllustrationFlexwoning";
import IllustrationContainerwoning from "./IllustrationContainerwoning";
import IllustrationWoonunit from "./IllustrationWoonunit";
import IllustrationTuinkamer from "./IllustrationTuinkamer";
import IllustrationModulaireAanbouw from "./IllustrationModulaireAanbouw";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const woningtypeIllustrations: Record<string, ComponentType<IllustrationProps>> = {
  "tiny-house": IllustrationTinyHouse,
  "micro-woning": IllustrationMicroWoning,
  mantelzorgwoning: IllustrationMantelzorgwoning,
  kangoeroewoning: IllustrationKangoeroewoning,
  chalet: IllustrationChalet,
  lodge: IllustrationLodge,
  vakantiebungalow: IllustrationVakantiebungalow,
  "prefab-woning": IllustrationPrefabWoning,
  systeemwoning: IllustrationSysteemwoning,
  flexwoning: IllustrationFlexwoning,
  containerwoning: IllustrationContainerwoning,
  woonunit: IllustrationWoonunit,
  tuinkamer: IllustrationTuinkamer,
  "modulaire-aanbouw": IllustrationModulaireAanbouw,
};

export default woningtypeIllustrations;
