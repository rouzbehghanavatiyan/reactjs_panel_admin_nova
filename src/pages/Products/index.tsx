import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { getAllProduct } from "../../services";
import NormalProduct from "./NormalProduct";
import AddNormalProduct from "./AddNormalProduct";

const Products = () => {
  const [showNormalProduct, setShowNormalProduct] = useState(false);
  const [allNormalProduct, setAllNormalProduct] = useState([]);

  const handleAllNormalProduct = async () => {
    const resAllProduct = await getAllProduct();
    setAllNormalProduct(resAllProduct?.data?.data);
  };

  useEffect(() => {
    handleAllNormalProduct();
  }, []);

  return (
    <Container maxWidth="xl">
      <NormalProduct
        handleAllNormalProduct={handleAllNormalProduct}
        allNormalProduct={allNormalProduct}
        setShowNormalProduct={setShowNormalProduct}
      />
      <Modal
        open={showNormalProduct}
        onClose={() => setShowNormalProduct(false)}
        title="افزودن محصول"
        maxWidth="lg"
      >
        <AddNormalProduct
          // productItem={productItem}
          setShowNormalProduct={setShowNormalProduct}
        />
      </Modal>
    </Container>
  );
};

export default Products;
