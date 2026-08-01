import { RenderSentiment } from "@/components/default/RenderSentiment";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalize, cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";
import { toast } from "sonner";


const sentimentOptions = [
    {
        label: 'Negatif',
        value: 'negative',
    },
    {
        label: 'Positif',
        value: 'positive',
    },
    {
        label: 'Netral',
        value: 'neutral',
    },
]

const SentimentBadge: NextPage<{
    sentiment: string,
    post_id: string,
    platform: string,
    onSuccess?: () => void
}> = ({ sentiment, post_id, platform, onSuccess }) => {
    const [value, setValue] = useState(sentiment.toLowerCase());
    const [openDialog, setOpenDialog] = useState(false)




    return (

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="hover:cursor-pointer">
                <RenderSentiment sentiment={sentiment} />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px] bg-card z-[10000]">
                <DialogHeader>
                    <DialogTitle>Ubah Sentimen</DialogTitle>
                </DialogHeader>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className=" justify-between"
                        >
                            {value ? sentimentOptions?.find((c) => c.value.toString() === value)?.label : "Select sentiment..."}
                            <ChevronsUpDown className="opacity-50 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className=" max-h-[300px] overflow-y-auto z-[10001]">

                        {
                            sentimentOptions?.map((item) => (
                                <DropdownMenuItem
                                    key={item.value}
                                    onClick={() => { setValue(item.value.toLowerCase()) }}
                                    className="flex justify-between cursor-pointer"

                                >
                                    {item.label}
                                    {item.value === value && <Check className="h-4 w-4 opacity-100" />}

                                </DropdownMenuItem>
                            ))
                        }

                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>

            </DialogContent>
        </Dialog>

    );
};


export default SentimentBadge;