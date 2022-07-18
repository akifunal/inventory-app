import Table from '@/components/Table';
import { Category } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: () => 'Category Name',
	},
];

type CategoryTableProps = {
	data: Category[];
};

const CategoryTable = ({ data }: CategoryTableProps) => {
	return <Table data={data} columns={columns} />;
};

export default CategoryTable;
