
import React, { useState } from 'react';
import type { Product } from '../types';
import { Image as ImageIcon, X } from 'lucide-react';

interface AdminProductRowProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const AdminProductRow: React.FC<AdminProductRowProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  
  // Estado para as 3 imagens
  const [productImages, setProductImages] = useState<string[]>(() => {
    if (product.images && product.images.length > 0) {
      return [...product.images, '', ''].slice(0, 3);
    }
    return [product.imageUrl, '', ''];
  });

  const handleInputChange = (field: keyof Product, value: string | boolean) => {
    setEditedProduct(prev => ({ ...prev, [field]: value }));
  };
  
  const handleImageUrlChange = (index: number, url: string) => {
    const newImages = [...productImages];
    newImages[index] = url;
    setProductImages(newImages);
    
    // Atualizar imageUrl principal (sempre a primeira imagem)
    if (index === 0) {
      setEditedProduct(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleSave = () => {
    // Filtrar imagens vazias
    const validImages = productImages.filter(img => img && img.trim() !== '');
    
    // Garantir que a primeira imagem seja a principal
    const updatedProduct = {
      ...editedProduct,
      imageUrl: validImages[0] || editedProduct.imageUrl,
      images: validImages.length > 0 ? validImages : [editedProduct.imageUrl]
    };
    
    onUpdate(updatedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    // Resetar imagens
    if (product.images && product.images.length > 0) {
      setProductImages([...product.images, '', ''].slice(0, 3));
    } else {
      setProductImages([product.imageUrl, '', '']);
    }
    setIsEditing(false);
  };

  const handlePromotionToggle = () => {
    onUpdate({ ...product, isPromotion: !product.isPromotion });
  }

  // Estilos comuns para inputs no admin para garantir visibilidade
  const inputStyle = "bg-white text-gray-900 border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400";

  if (isEditing) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border-2 border-red-500 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
           <div className="flex flex-col items-center">
             <img src={productImages[0] || editedProduct.imageUrl} alt={editedProduct.name} className="w-20 h-20 object-cover rounded-md border border-gray-200" />
             <span className="mt-2 text-xs font-bold text-gray-600">Imagem Principal</span>
           </div>
           <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" value={editedProduct.name} onChange={e => handleInputChange('name', e.target.value)} className={inputStyle} placeholder="Nome" />
              <input type="text" value={editedProduct.sku} onChange={e => handleInputChange('sku', e.target.value)} className={inputStyle} placeholder="SKU" />
              <input type="text" value={editedProduct.category} onChange={e => handleInputChange('category', e.target.value)} className={inputStyle} placeholder="Categoria" />
              <input type="text" value={editedProduct.price} onChange={e => handleInputChange('price', e.target.value)} className={inputStyle} placeholder="Preço (R$)" />
              <input type="text" value={editedProduct.originalPrice || ''} onChange={e => handleInputChange('originalPrice', e.target.value)} className={inputStyle} placeholder="Preço Orig. (Opcional)" />
               <label className="flex items-center justify-center gap-2 cursor-pointer bg-white p-2 rounded border border-gray-300 hover:bg-gray-50">
                 <input type="checkbox" checked={editedProduct.isPromotion} onChange={e => handleInputChange('isPromotion', e.target.checked)} className="h-5 w-5 rounded text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500" />
                 <span className="text-sm font-bold text-gray-700">Promoção</span>
              </label>
           </div>
        </div>
        
        {/* Seção de Imagens */}
        <div className="bg-white p-4 rounded-lg border border-gray-300">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <ImageIcon size={16} className="text-red-600" />
            Imagens do Produto (até 3)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Imagem 1 - Principal */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Imagem 1 (Principal) *</label>
              <input 
                type="text" 
                value={productImages[0]} 
                onChange={e => handleImageUrlChange(0, e.target.value)}
                className={inputStyle}
                placeholder="URL da imagem principal"
              />
              {productImages[0] && (
                <div className="relative group">
                  <img src={productImages[0]} alt="Preview 1" className="w-full h-32 object-cover rounded border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => handleImageUrlChange(0, '')}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Imagem 2 - Opcional */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Imagem 2 (Opcional)</label>
              <input 
                type="text" 
                value={productImages[1]} 
                onChange={e => handleImageUrlChange(1, e.target.value)}
                className={inputStyle}
                placeholder="URL da segunda imagem"
              />
              {productImages[1] && (
                <div className="relative group">
                  <img src={productImages[1]} alt="Preview 2" className="w-full h-32 object-cover rounded border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => handleImageUrlChange(1, '')}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Imagem 3 - Opcional */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Imagem 3 (Opcional)</label>
              <input 
                type="text" 
                value={productImages[2]} 
                onChange={e => handleImageUrlChange(2, e.target.value)}
                className={inputStyle}
                placeholder="URL da terceira imagem"
              />
              {productImages[2] && (
                <div className="relative group">
                  <img src={productImages[2]} alt="Preview 3" className="w-full h-32 object-cover rounded border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => handleImageUrlChange(2, '')}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">💡 Dica: Cole a URL completa da imagem hospedada</p>
        </div>
        
        <textarea value={editedProduct.description} onChange={e => handleInputChange('description', e.target.value)} className={inputStyle} rows={3} placeholder="Descrição Longa"></textarea>
        <input type="text" value={editedProduct.shortDescription} onChange={e => handleInputChange('shortDescription', e.target.value)} className={inputStyle} placeholder="Descrição Curta (Ex: 10% no PIX)" />
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-colors">Cancelar</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg">Salvar Alterações</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
      <div className="flex gap-1">
        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0 border border-gray-100" />
        {product.images && product.images.length > 1 && (
          <div className="flex flex-col gap-1">
            {product.images.slice(1, 3).map((img, idx) => (
              <img key={idx} src={img} alt={`${product.name} ${idx + 2}`} className="w-7 h-7 object-cover rounded border border-gray-100" />
            ))}
          </div>
        )}
      </div>
      <div className="flex-grow text-center md:text-left">
        <p className="font-bold text-gray-800 text-lg">{product.name} <span className="text-xs text-gray-500 font-normal">(SKU: {product.sku})</span></p>
        <p className="text-red-600 font-bold">{product.price} {product.originalPrice && <span className="text-gray-400 line-through text-sm ml-2 font-normal">{product.originalPrice}</span>}</p>
        <p className="text-sm text-gray-500 mt-1">{product.shortDescription}</p>
        {product.images && product.images.length > 1 && (
          <p className="text-xs text-blue-600 mt-1">📸 {product.images.length} fotos</p>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <label htmlFor={`promo-${product.id}`} className="flex items-center cursor-pointer" title="Marcar como promoção">
          <div className="relative">
            <input id={`promo-${product.id}`} type="checkbox" className="sr-only" checked={product.isPromotion} onChange={handlePromotionToggle} />
            <div className={`block w-12 h-7 rounded-full transition-colors ${product.isPromotion ? 'bg-red-500' : 'bg-gray-200'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${product.isPromotion ? 'transform translate-x-5' : ''}`}></div>
          </div>
        </label>
        <button onClick={() => setIsEditing(true)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Editar">
             ✏️
        </button>
        <button onClick={() => onDelete(product.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Excluir">
            🗑️
        </button>
      </div>
    </div>
  );
};

export default AdminProductRow;
