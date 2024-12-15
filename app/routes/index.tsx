import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const router = useRouter();
	const [items, setItems] = useState<string[]>(
		Array.from({ length: 3 }, (_, i) => `Initial Item ${i + 1}`),
	);

	// Handler to add new items and invalidate router
	const handleAddItem = () => {
		const newItems = [...items, `New Item ${items.length + 1}`];

		setItems(newItems);

		// Invalidate the router to force a reload
		console.log("invalidate - add");
		router.invalidate();
	};

	// Handler to remove last item and invalidate router
	const handleRemoveItem = () => {
		const updatedItems = items.slice(0, -1);

		setItems(updatedItems);

		// Invalidate the router to force a reload
		console.log("invalidate - remove");
		router.invalidate();
	};

	return (
		<div className="p-4 max-w-md mx-auto">
			<h3 className="text-2xl font-bold mb-4">
				Dynamic Item List with Router Invalidation
			</h3>

			<div className="flex gap-2 mb-4">
				<button
					type="button"
					onClick={handleAddItem}
					className="bg-green-500 text-white px-4 py-2 rounded"
				>
					Add Item (Invalidate)
				</button>
				<button
					type="button"
					onClick={handleRemoveItem}
					className="bg-red-500 text-white px-4 py-2 rounded"
					disabled={items.length <= 0}
				>
					Remove Item (Invalidate)
				</button>
			</div>

			{items.length > 0 ? (
				<ul className="list-disc pl-5">
					{items.map((item, index) => (
						<li key={`${item}-${index}`} className="mb-2 animate-fade-in">
							{item}
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500">No items available</p>
			)}
		</div>
	);
}

export default Home;
