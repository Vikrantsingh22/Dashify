// import Link from "next/link";
import { Bell, CircleUser, Home, Menu, Package2, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BarChart,
  DoughnutChart,
  PieChart,
  RadarChart,
  ScatterChart,
} from "@/components/Charts";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ToggleButton";
import {
  country,
  doughnutBackgroundColor,
  end_year,
  options,
  pieBackgroundColor,
  region,
  sector,
  topics,
} from "./constants";

const formSchema = z.object({
  end_year: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  topic: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  sector: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  region: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  pestle: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  source: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  country: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
  demo: z.string().min(0, {
    message: "Username must be at least 2 characters.",
  }),
});

export function HomePage() {
  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios.post("http://localhost:5000/endDate", {}, config).then((response) => {
      console.log(response.data);
      setresponse(response.data);
    });
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      end_year: "",
      topic: "",
      sector: "",
      region: "",
      pestle: "",
      source: "",
      country: "",
      demo: "",
    },
  });
  const [response, setresponse] = useState({});
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const chats = await axios.post(
      "http://localhost:5000/endDate",
      data,
      config
    );
    console.log(chats);
    setresponse(chats.data);
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[330px_1fr] lg:grid-cols-[300px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={""} className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Dashify</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to={""}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <ScrollArea className="h-[500px]">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Filter The Data</CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  {/* <Button size="sm" className="w-full">
                  Upgrade
                </Button> */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="end_year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Year</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Leave or Select an End Year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {end_year.map((options) => {
                                  return (
                                    <SelectItem value={options}>
                                      {options}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>topic</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Leave or Select a Topic" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {topics.map((options) => {
                                  return (
                                    <SelectItem value={options}>
                                      {options}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>sector</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Leave or Select a Sector" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sector.map((options) => {
                                  return (
                                    <SelectItem value={options}>
                                      {options}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>region</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Leave or Select a Region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {region.map((options) => {
                                  return (
                                    <SelectItem value={options}>
                                      {options}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pestle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>pestle</FormLabel>

                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Leave or Select a PEST" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {options.map((options) => {
                                  return (
                                    <SelectItem value={options}>
                                      {options}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>source</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the source"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Leave or Select a Country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {country.map((options) => {
                                  return (
                                    <SelectItem value={options}>
                                      {options}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to={""}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Dashify</span>
                </Link>
                <Link
                  to={""}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <ModeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex-col items-center">
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">
                Visualisations and Table
              </h1>
            </div>
            <div>
              <h2>
                {" "}
                If there is no information for any point in pieChart,
                doughnutChart or radar it means there is no data for the current
                filter attributes in DB
              </h2>
            </div>
          </div>
          <div className="flex-col items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5 p-6">
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Insights
                  </CardTitle>
                  {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {response?.insightsResponse?.insights?.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {/* Total insights according to filter attributes */}
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sectors
                  </CardTitle>
                  {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {response?.sectorResponse?.labels?.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {/* Total sectors according to filter attributes */}
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Countries
                  </CardTitle>
                  {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {response?.countryResponse?.labels?.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {/* Total countries according to filter attributes */}
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Regions
                  </CardTitle>
                  {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {response?.regionResponse?.labels?.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {/* Total regions according to filter attributes */}
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Topics
                  </CardTitle>
                  {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {response?.topicResponse?.labels?.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {/* Total topics according to filter attributes */}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex gap-4 p-4 lg:gap-6 lg:p-6">
              <Card x-chunk="dashboard-02-chunk-1">
                <div className="m-3">
                  <PieChart
                    labels={response?.countryResponse?.labels}
                    data={response?.countryResponse?.data}
                    backgroundColor={pieBackgroundColor}
                  />
                </div>
              </Card>
              <Card x-chunk="dashboard-02-chunk-1">
                <div className="m-3">
                  <DoughnutChart
                    labels={response?.regionResponse?.labels}
                    data={response?.regionResponse?.data}
                    backgroundColor={doughnutBackgroundColor}
                    legends={false}
                  />
                </div>
              </Card>
              <Card x-chunk="dashboard-02-chunk-1">
                <div className="m-3">
                  <RadarChart
                    data={response?.startyearResponse?.data}
                    labels={response?.startyearResponse?.labels}
                    fill={true}
                    borderColor="rgb(255, 99, 132)"
                    backgroundColor="rgba(255, 99, 132, 0.2)"
                  />
                </div>
              </Card>
            </div>

            <div className="flex w-full items-start">
              <Card
                x-chunk="dashboard-01-chunk-1"
                className="w-full m-10 justify-start"
              >
                <BarChart
                  data_1={response?.insightsResponse?.intensities}
                  data_2={response?.insightsResponse?.relevances}
                  data_3={response?.insightsResponse?.likelihoods}
                  title_1="Intensity"
                  title_2="Relevance"
                  title_3="Likelihood"
                  bgColor_1={`hsl(260,50%,30%)`}
                  bgColor_2={`hsl(360,90%,90%)`}
                  bgColor_3={`hsl(120,90%,90%)`}
                  labels={response?.insightsResponse?.insights}
                />
              </Card>
            </div>
            <div className="flex h-96 w-full">
              <Card x-chunk="dashboard-01-chunk-1" className="w-full m-10">
                <ScatterChart
                  data={response?.topicResponse?.data}
                  labels={response?.topicResponse?.labels}
                  backgroundColor={[
                    "rgba(255, 99, 132, 0.5)", // Red
                    "rgba(54, 162, 235, 0.5)", // Blue
                    "rgba(255, 206, 86, 0.5)", // Yellow
                    "rgba(75, 192, 192, 0.5)", // Green
                    "rgba(153, 102, 255, 0.5)", // Purple
                    "rgba(255, 159, 64, 0.5)", // Orange
                    "rgba(255, 99, 132, 0.5)", // Red
                    "rgba(54, 162, 235, 0.5)", // Blue
                    "rgba(255, 206, 86, 0.5)", // Yellow
                  ]}
                />
              </Card>
            </div>
            <div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Insights</CardTitle>
                  <CardDescription>
                    List of all the insights based on the filters.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="flex h-96 w-full">
              {/* <Card className="w-full">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
              </Card> */}
              <Table>
                <TableCaption>Lists of all Insights</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Intensity</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Insight</TableHead>
                    <TableHead>PESTLE</TableHead>
                    <TableHead>Source</TableHead>

                    <TableHead>End year</TableHead>
                    <TableHead className="text-right">Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {response?.AllResponse?.map((data) => (
                    <TableRow key={data?._id}>
                      <TableCell className="font-medium">
                        {data?.intensity ? data?.intensity : "N/A"}
                      </TableCell>
                      <TableCell>
                        {data?.sector ? data?.sector : "N/A"}
                      </TableCell>
                      <TableCell>
                        {data?.insight ? data?.insight : "N/A"}
                      </TableCell>
                      <TableCell>
                        {data?.pestle ? data?.pestle : "N/A"}
                      </TableCell>
                      <TableCell>
                        {data?.source ? data?.source : "N/A"}
                      </TableCell>
                      <TableCell>
                        {data?.end_year ? data?.end_year : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {data?.country ? data?.country : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
