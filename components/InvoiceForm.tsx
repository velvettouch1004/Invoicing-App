"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "./ui/scroll-area";
import useSWR from "swr";
import { fetcher } from "@/lib/functions/fetcher";
import { Countries } from "@/types/countries";
import { InvoiceFormSchema } from "@/lib/types/schemas";
import { netPaymentData, status } from "@/lib/data";
import { Deliverable } from "@/lib/types/data";
import { InvoiceFormProps } from "@/lib/types/props";

function calculateDueDate(invoiceDate: Date, paymentTerms: string): Date {
  const daysToAdd =
    {
      "1 Day": 1,
      "7 Days": 7,
      "14 Days": 14,
      "30 Days": 30,
    }[paymentTerms] || 0;

  return addDays(invoiceDate, daysToAdd);
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [deliverables, setDeliverables] = useState([
    { id: uuidv4(), deliverable: "", quantity: 0, price: 0 },
  ]);
  const [total, setTotal] = useState(calculateTotal());

  const form = useForm<z.infer<typeof InvoiceFormSchema>>({
    resolver: zodResolver(InvoiceFormSchema),
    mode: "onChange",
    defaultValues: {
      businessAddress: "",
      businessCity: "",
      businessZip: "",
      businessCountry: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      clientCity: "",
      clientZip: "",
      clientCountry: "",
      paymentTerms: "",
      paymentDue: "",
      status: "",
      projectName: "",
      /*       deliverables: [{ id: uuidv4(), deliverable: "", quantity: 0, price: 0 }],
       */
    },
  });

  const invoiceDate = form.watch("invoiceDate");
  const paymentTerms = form.watch("paymentTerms");

  useEffect(() => {
    if (invoiceDate && paymentTerms) {
      const calculatedDueDate = calculateDueDate(
        new Date(invoiceDate),
        paymentTerms
      );
      setDueDate(calculatedDueDate);
    }
  }, [invoiceDate, paymentTerms]);

  const {
    data: countries,
    error,
    isLoading,
  } = useSWR<Countries>("https://restcountries.com/v3.1/all", fetcher);

  const sortedCountries = useMemo(() => {
    return countries?.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  }, [countries]);

  function calculateTotal() {
    return deliverables.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
  }

  function handleAddNewDeliverable() {
    const newDeliverable = {
      id: uuidv4(),
      deliverable: "",
      quantity: 0,
      price: 0,
    };
    setDeliverables([...deliverables, newDeliverable]);
  }

  function handleDeleteDeliverable(id: string) {
    setDeliverables(deliverables.filter((item) => item.id !== id));
    setTotal(calculateTotal());
  }

  function handleUpdateDeliverable(
    id: string,
    field: keyof Deliverable,
    value: string | number
  ) {
    setDeliverables(
      deliverables.map((deliverable) =>
        deliverable.id === id ? { ...deliverable, [field]: value } : deliverable
      )
    );
    setTotal(calculateTotal());
  }

  const {
    formState: { isValid },
  } = form;

  return (
    <ScrollArea className="h-[40.625rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="form-label">Bill From</p>
              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Street Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="19 Union Terrace"
                        className="capitalize"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="businessCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">City</FormLabel>
                      <FormControl>
                        <Input placeholder="London" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessZip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">Post Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E1 3EZ"
                          className="uppercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="businessCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {error ? (
                          <p>Error getting countries</p>
                        ) : !countries ? (
                          <p>Loading countries...</p>
                        ) : (
                          countries
                            .sort((a, b) =>
                              a.name.common.localeCompare(b.name.common)
                            )
                            .map((country) => (
                              <SelectItem
                                className="cursor-pointer"
                                key={country.cca3}
                                value={country.name.common}
                              >
                                {country.name.common}
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="form-label">Bill To</p>
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">
                      Client&apos;s Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Alex Grim"
                        className="capitalize"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">
                      Client&apos;s Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="alexgrim@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">
                      Client&apos;s Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="19 Union Terrace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">City</FormLabel>
                      <FormControl>
                        <Input placeholder="Bath" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientZip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="BT23 16D"
                          className="uppercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="clientCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {error ? (
                          <p>Error getting countries</p>
                        ) : !sortedCountries ? (
                          <p>Loading countries...</p>
                        ) : (
                          sortedCountries.map((country) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={country.cca3}
                              value={country.name.common}
                            >
                              {country.name.common}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {status.map((status) => (
                      <SelectItem
                        className="cursor-pointer capitalize"
                        key={status}
                        value={status}
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="form-label">Invoice Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal bg-white hover:bg-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Payment Terms</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {netPaymentData.map((option) => (
                        <SelectItem key={option} value={option}>
                          {`Net ${option}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="paymentDue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Payment Due Date</FormLabel>
                <FormControl>
                  <Input value={dueDate ? format(dueDate, "PPP") : ""} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Create business cards" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div>
          {deliverables.map((deliverable, index) => (
            <div
              key={deliverable.id}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name={`deliverables.${index}.deliverable`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Deliverable</FormLabel>
                    <FormControl>
                      <Input placeholder="Create business cards" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <div className="flex">
                  <FormField
                    control={form.control}
                    name={`deliverables.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`deliverables.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>{formatCurrency(total)}</p>
                  <Button
                    className="p-0 bg-transparent hover:bg-transparent"
                    onClick={() => handleDeleteDeliverable}
                  >
                    <Icon
                      svgProps={{
                        width: "13",
                        height: "16",
                        viewBox: "0 0 13 16",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      }}
                    >
                      <path
                        id="Combined Shape"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z"
                        fill="#888EB0"
                      />
                    </Icon>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button className="w-full" onClick={handleAddNewDeliverable}>
            + Add New Item
          </Button>
        </div> */}
          <div className="flex justify-between">
            <Button>Discard</Button>
            <div>
              <Button>Save as Draft</Button>
              <Button type="submit" disabled={!isValid}>
                Send
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
