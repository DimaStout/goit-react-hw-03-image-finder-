import { Bars } from 'react-loader-spinner';
import { BackdropStyled } from 'components/Modal/Modal.styled';

const Loader = () => {
  return (
    <BackdropStyled>
      <Bars
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </BackdropStyled>
  );
};
export default Loader;
