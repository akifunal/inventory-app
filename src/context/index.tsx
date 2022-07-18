import {
	createContext,
	Dispatch,
	type SetStateAction,
	useState,
	useContext,
} from 'react';

export const LinksContext = createContext<Boolean[] | []>([]);

export const LinksHandlerContext = createContext<Dispatch<
	SetStateAction<boolean[]>
> | null>(null);

type LinksProviderProps = {
	children: React.ReactNode;
};

export function useLinks() {
	return useContext(LinksContext);
}

export function useLinksHandler() {
	return useContext(LinksHandlerContext);
}

export default function LinksContextProvider({ children }: LinksProviderProps) {
	const [links, setLinks] = useState([true, false]);

	return (
		<section className='section'>
			<LinksContext.Provider value={links}>
				<LinksHandlerContext.Provider value={setLinks}>
					{children}
				</LinksHandlerContext.Provider>
			</LinksContext.Provider>
		</section>
	);
}
