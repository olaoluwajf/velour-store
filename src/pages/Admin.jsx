import { useCallback, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import StatsCards from '../components/admin/StatsCards';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import { useProducts } from '../context/ProductsContext';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState(null); // null | 'new' | product
  const [deleting, setDeleting] = useState(null); // null | product
  const closeEdit = useCallback(() => setEditing(null), []);
  const closeDelete = useCallback(() => setDeleting(null), []);

  const save = async (form) => {
    if (editing === 'new') await addProduct(form);
    else {
      const { id, ...changes } = form;
      await updateProduct(editing.id, changes);
    }
    closeEdit();
  };

  const confirmDelete = async () => {
    await deleteProduct(deleting.id);
    closeDelete();
  };

  return (
    <div className="container section">
      <PageHeader title="Admin dashboard" subtitle="Manage your catalog">
        <button className="btn btn-primary" onClick={() => setEditing('new')}>+ Add product</button>
      </PageHeader>
      <StatsCards products={products} />
      <ProductTable products={products} onEdit={setEditing} onDelete={setDeleting} />

      <Modal open={!!editing} title={editing === 'new' ? 'New product' : 'Edit product'} onClose={closeEdit}>
        {editing && (
          <ProductForm key={editing === 'new' ? 'new' : editing.id} initial={editing === 'new' ? null : editing} onSubmit={save} onCancel={closeEdit} />
        )}
      </Modal>

      <Modal open={!!deleting} title="Delete product" size="sm" onClose={closeDelete}>
        {deleting && (
          <>
            <p>Delete <strong>{deleting.name}</strong>? This cannot be undone.</p>
            <div className="row-gap end">
              <button className="btn btn-ghost" onClick={closeDelete}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
