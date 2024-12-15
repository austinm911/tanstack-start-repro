import { Outlet, createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { R2 } from "node-cloudflare-r2";

// This works fine
// const pokemonResponse = createServerFn({
// 	method: "GET",
// }).handler(async (req) => {
// 	const response = await fetch("https://pokeapi.co/api/v2/pokemon");
// 	const data = await response.json();
// 	return data.results;
// });

const checkBucket = createServerFn({
	method: "GET",
}).handler(async (req) => {
	const bucket = new R2({
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
	});
	const data = await bucket.listBuckets();
	return data;
});

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	loader: async () => await checkBucket(),
});

function RouteComponent() {
	const bucketResponse = Route.useLoaderData();
	return (
		<div>
			<div>I'm the layout child of __root</div>
			{/* show first pokemon name */}
			<div>{bucketResponse.buckets[0].name}</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
