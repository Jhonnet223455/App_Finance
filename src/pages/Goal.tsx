import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonButton,
  IonImg
} from '@ionic/react';
import { useState } from 'react';
import './Goal.css';

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  
}

const Goal: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      name: "iPhone 15 Pro",
      description: "128GB - Space Black",
      price: "$899",
      image: "/public/iphone.png",
      
    },
    {
      name: "PS5 Controller",
      description: "Wireless DualSense",
      price: "$699",
      image: "/public/ps5.png",
      
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h5 className="activity-title">Goal</h5>

        <IonList className="activity-list">
          {products.map((item, index) => (
            <IonItem lines="none" key={index} className="activity-item">
              <IonImg src={item.image} className="product-img" />
              <IonLabel className="activity-label">
                <IonText className="activity-name">{item.name}</IonText>
                <IonText className="activity-description">{item.description}</IonText>
              </IonLabel>
              <IonText className="activity-value">{item.price}</IonText>
            </IonItem>
          ))}
        </IonList>

        <div className="form-section">
          <h6>Create Product</h6>

          <IonInput
            placeholder="Product name"
            value={newProduct.name || ''}
            onIonChange={(e) => setNewProduct({ ...newProduct, name: e.detail.value! })}
          />
         
          <IonInput
            placeholder="Description"
            value={newProduct.description || ''}
            onIonChange={(e) => setNewProduct({ ...newProduct, description: e.detail.value! })}
          />
          <IonInput
            type="number"
            placeholder="Price"
            value={newProduct.price || ''}
            onIonChange={(e) => setNewProduct({ ...newProduct, price: `$${e.detail.value}` })}
          />

          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="preview" className="preview-img" />}

          <IonButton expand="block" onClick={handleCreate} className="activity-button">
            Create Goal
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Goal;
