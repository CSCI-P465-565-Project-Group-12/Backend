import "./HomePageLayoutCards.css";

interface HomePageLayoutCardsProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}
const HomePageLayoutCards: React.FC<HomePageLayoutCardsProps> = (props) => {
  return (
    <div
      className="home-page-layout-cards"
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      {props.children}
    </div>
  );
};
export default HomePageLayoutCards;
