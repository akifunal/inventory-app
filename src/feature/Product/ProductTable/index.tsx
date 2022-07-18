import Table from '@/components/Table';
import { Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Product>[] = [
	{
		accessorKey: 'name',
		header: () => 'Product',
	},
	{
		accessorKey: 'categoryName',
		header: () => 'Category',
	},
	{
		accessorKey: 'quantity',
		header: () => 'Quantity',
	},
];

type ProductTableProps = {
	data: Product[];
};

const ProductTable = ({ data }: ProductTableProps) => {
	return <Table data={data} columns={columns} />;
};

export default ProductTable;
