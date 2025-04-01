import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonButton,
  IonImg,
  IonModal
} from '@ionic/react';
import { useState } from 'react';
import './Goal.css';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

const Goal: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      name: "iPhone 15 Pro",
      description: "128GB - Space Black",
      price: 899,
      image: "/iphone.png",
    },
    {
      name: "PS5 Controller",
      description: "Wireless DualSense",
      price: 699,
      image: "/ps5.png",
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result as string }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (newProduct.name && newProduct.price && newProduct.description && newProduct.image) {
      setProducts((prev) => [...prev, newProduct as Product]);
      setNewProduct({});
      setImagePreview(null);
      setShowModal(false); // Cerrar el modal después de crear el Goal
    }
  };

  const handleDelete = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCloseModal = () => {
    setNewProduct({});
    setImagePreview(null);
    setShowModal(false);
  };

  const total = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h5 className="activity-title">Goals</h5>

        {/* Lista de productos */}
        <IonList className="activity-list">
          {products.map((item, index) => (
            <IonItem lines="none" key={index} className="activity-item">
              <IonImg src={item.image} className="product-img" />
              <IonLabel className="activity-label">
                <div className="activity-text">
                  <IonText className="activity-name">{item.name}</IonText>
                  <IonText className="activity-description">{item.description}</IonText>
                </div>
              </IonLabel>
              <IonText className="activity-value">${item.price}</IonText>
              {/* Botón para eliminar el producto */}
              <IonButton
                fill="clear"
                color="danger"
                onClick={() => handleDelete(index)}
                className="delete-btn"
              >
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Footer con el total y botón que abre el modal */}
        <div className="fixed-footer">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IonText className="activity-label">Total</IonText>
            <IonText className="activity-value" style={{ marginTop: '0px' }}>${total}</IonText>
          </div>

          <IonButton className="activity-button" expand="block" onClick={() => setShowModal(true)}>
            New Goal
          </IonButton>
        </div>

        {/* Modal para el formulario */}
        <IonModal style={{ padding: '30px' }} isOpen={showModal} onDidDismiss={handleCloseModal}>
          <div className="activity-card" style={{ padding: '20px', borderRadius: '100px' }}>
            <div className="form-section">
              <IonText className="activity-label" style={{ paddingRight: '38px' }}>Name</IonText>
              <IonInput
                className="activity-input"
                placeholder="Add goal name"
                value={newProduct.name || ''}
                onIonChange={(e) => setNewProduct({ ...newProduct, name: e.detail.value! })}
              />
            </div>

            <div className="form-section">
              <IonText className="activity-label">Description</IonText>
              <IonInput
                className="activity-input"
                placeholder="Add goal description"
                value={newProduct.description || ''}
                onIonChange={(e) => setNewProduct({ ...newProduct, description: e.detail.value! })}
              />
            </div>

            <div className="form-section">
              <IonText className="activity-label" style={{ paddingRight: '45px' }}>Price</IonText>
              <IonInput
                className="activity-input"
                type="number"
                placeholder="$0.00"
                value={newProduct.price || ''}
                onIonChange={(e) => setNewProduct({ ...newProduct, price: Number(e.detail.value) })}
              />
            </div>

            <div className="form-section">
              <IonText className="activity-label">Upload Image</IonText>
              <label htmlFor="file-upload" className="custom-file-upload">
                Select Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }} // Oculta el input original
              />
            </div>

            {imagePreview && <IonImg src={imagePreview} className="preview-img" />}

            <div style={{ marginTop: '20px' }}>
              <IonButton className="activity-button" expand="block" onClick={handleCreate}>
                Save Goal
              </IonButton>
              <IonButton
                className="activity-button"
                expand="block"
                color="medium"
                onClick={handleCloseModal}
                style={{ marginTop: '10px' }}
              >
                Cancel
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Goal;
