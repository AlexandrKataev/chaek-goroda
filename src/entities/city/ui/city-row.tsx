interface CityRowProps {
  name: string;
  className: string;
}

export const CityRow = (props: CityRowProps) => {
  return (
    <div className="grid ">
      <span className={props.className}>{props.name}</span>
    </div>
  );
};
