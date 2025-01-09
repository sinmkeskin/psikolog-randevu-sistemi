import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CategorySearch() {
  return (
    <div className="mb-10 items-center flex flex-col gap-3">
      {" "}
      {/* flex flex-col ortalıyor*/}
      <h2 className="font-bold  text-4xl tracking-wide">Doktorlarımız</h2>
      <h2 className="text-blue-300 text-l">
        Seçtiğiniz Psikoloğumuzdan Randevu Talep Ediniz
      </h2>
      <div className="flex w-full max-w-sm items-center space-x-2 flex-col gap-3">
        <Input type="araştır" placeholder="Araştır.." />
        <Button type="submit">Ara</Button>
      </div>
    </div>
  );
}

export default CategorySearch;
