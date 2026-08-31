import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowLeft, Home, Upload, X } from 'lucide-react';
import { productApi, uploadApi } from '../utils/api';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await productApi.getAll();
    if (response.success && response.data) {
      setProducts(response.data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = formData.image;

      // Upload image if file is selected
      if (imageFile) {
        const uploadResponse = await uploadApi.uploadImage(imageFile);
        if (uploadResponse.success && uploadResponse.data) {
          imageUrl = uploadResponse.data.url;
        } else {
          alert('Failed to upload image. Please try again.');
          setUploading(false);
          return;
        }
      } else if (!imageUrl && !editingProduct) {
        // Require image only for new products
        alert('Please upload an image or provide an image URL');
        setUploading(false);
        return;
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (editingProduct) {
        await productApi.update(editingProduct._id, productData);
      } else {
        await productApi.create(productData);
      }

      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
        featured: false,
      });
      setImageFile(null);
      setImagePreview('');
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
      featured: product.featured || false,
    });
    setImagePreview(product.image);
    setImageFile(null);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Clear URL input when file is selected
      setFormData({ ...formData, image: '' });
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: e.target.value });
    // Clear file when URL is entered
    if (e.target.value) {
      setImageFile(null);
      setImagePreview(e.target.value);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, image: '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productApi.delete(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg">
      <div className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">Manage Products</h1>
            </div>
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-accent transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-lightText">Products</h2>
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  image: '',
                  stock: '',
                  featured: false,
                });
                setImageFile(null);
                setImagePreview('');
                setShowForm(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-lightText">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-lightText">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-lightText">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-lightText">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-lightText">Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-lightText">Product Image</label>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4 relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <div className="flex flex-col items-center">
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or use URL */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                  </div>

                  {!imagePreview && !formData.image && (
                    <p className="mt-2 text-sm text-amber-600">Please upload an image or provide an image URL (optional for editing)</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-lightText">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="font-semibold text-lightText">Featured Product</span>
                  </label>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : editingProduct ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-lightText">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-primary font-bold">Rs{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:text-secondary"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
