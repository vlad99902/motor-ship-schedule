import Select from 'react-select/src/Select';

export type SelectOptionType = { value?: string; label?: string };

type MotorShipRouteSelectType = {
  selectedRoute: SelectOptionType;
  setSelectedRoute: (arg0: SelectOptionType) => void;
  options: SelectOptionType[];
};

export const MotorShipRouteSelect: React.FC<MotorShipRouteSelectType> = ({
  selectedRoute,
  setSelectedRoute,
  options,
}) => {
  return (
    <>
      <Select
        value={selectedRoute}
        onChange={() => setSelectedRoute(selectedRoute)}
        options={options}
      />
    </>
  );
};
