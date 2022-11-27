import { useTranslation } from "react-i18next";
import Flavour from "../../interfaces";

interface SelectFlavourControlProps {
  onChange: (uuid: string) => void;
  value: string,
  hierarchicalFlavours: d3.HierarchyNode<Flavour>;
}

const SelectFlavourControl = ({ onChange, value, hierarchicalFlavours } : SelectFlavourControlProps) => {
  const { t } = useTranslation();

  const getLabelForFlavour = (flavour: d3.HierarchyNode<Flavour>) => {
    if(!flavour.parent) {
      return flavour.data.key ? t(`flavours.${flavour.data.key}`) : flavour.data.name;
    }

    return flavour
      .ancestors()
      .reverse()
      .slice(1)
      .map((ancestor) => ancestor.data.key ? t(`flavours.${ancestor.data.key}`) : ancestor.data.name).join(" > ");
  }

  return (
    <div className="control">
      <div className="select">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value=''></option>
          {hierarchicalFlavours ? hierarchicalFlavours.descendants().map((flavour) => (
            <option value={flavour.data.uuid} key={flavour.data.uuid}>
              {getLabelForFlavour(flavour)}
            </option>
          )) : ''}
        </select>
      </div>
    </div>
  )
}

export default SelectFlavourControl;
