import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

// Query Client Initialization
const queryClient = new QueryClient();

const fetchNFTs = async () => {
    const response = await fetch("http://localhost:4001/get-all-deployed-nfts");
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
};

function NFTListCard() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["nfts"],
        queryFn: fetchNFTs,
        retry: 3
    });

    console.log(data);

    const handleRefresh = async () => {
        await refetch();
    };

    return (
        <Card className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <CardHeader>
                <CardTitle>List of NFT</CardTitle>
                <CardDescription>Fetched Data</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data && data.items?.map((item: any) => (
                            <div key={item.id} className="p-4 border rounded">
                                <p>{item.name}</p>
                                <p>{item.address}</p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <button
                    className="btn btn-primary"
                    onClick={handleRefresh}
                    disabled={isLoading}
                >
                    {isLoading ? "Refreshing..." : "Refresh"}
                </button>
            </CardFooter>
        </Card>
    );
}

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                            <Card className="aspect-video rounded-xl bg-muted/50">
                                <CardHeader>
                                    <CardTitle>NFT Factory</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>
                            <Card className="aspect-video rounded-xl bg-muted/50">
                                <CardHeader>
                                    <CardTitle>Historique </CardTitle>
                                    <CardDescription>Latest transaction on the smartcontract</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>
                        </div>
                        <NFTListCard />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </QueryClientProvider >
    );
}
