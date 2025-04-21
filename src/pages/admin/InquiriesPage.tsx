import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { productsData } from "@/data/products";
import { getAllInquiries, updateInquiryStatus, deleteInquiry, type ProductInquiry } from "@/utils/inquiries";

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<ProductInquiry | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getAllInquiries();
        setInquiries(data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        toast({
          title: "Failed to load inquiries",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchInquiries();
  }, [toast]);

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.subproductName && 
        inquiry.subproductName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const handleViewInquiry = async (inquiry: ProductInquiry) => {
    setSelectedInquiry(inquiry);
    
    // Mark as read if it's new
    if (inquiry.status === "new") {
      try {
        const updatedInquiry = await updateInquiryStatus(inquiry.id, "read");
        if (updatedInquiry) {
          const updatedInquiries = await getAllInquiries();
          setInquiries(updatedInquiries);
        }
      } catch (error) {
        console.error("Error updating inquiry status:", error);
      }
    }
    
    setViewDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (inquiryToDelete) {
      try {
        const deleted = await deleteInquiry(inquiryToDelete);
        if (deleted) {
          const updatedInquiries = await getAllInquiries();
          setInquiries(updatedInquiries);
          setDeleteDialogOpen(false);
          setInquiryToDelete(null);
          toast({
            title: "Inquiry deleted",
            description: "The inquiry has been successfully deleted.",
          });
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        toast({
          title: "Error deleting inquiry",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const openDeleteDialog = (inquiryId: string) => {
    setInquiryToDelete(inquiryId);
    setDeleteDialogOpen(true);
  };
  
  const markAsReplied = async () => {
    if (selectedInquiry) {
      try {
        const updatedInquiry = await updateInquiryStatus(selectedInquiry.id, "replied");
        if (updatedInquiry) {
          const updatedInquiries = await getAllInquiries();
          setInquiries(updatedInquiries);
          
          toast({
            title: "Marked as replied",
            description: "The inquiry has been marked as replied.",
          });
          
          setViewDialogOpen(false);
        }
      } catch (error) {
        console.error("Error marking inquiry as replied:", error);
        toast({
          title: "Error updating inquiry",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const getProductName = (productId?: string) => {
    if (!productId) return "General Inquiry";
    return productsData.find(p => p.id === productId)?.title || 'Unknown Product';
  };

  if (loading) {
    return <div className="py-10 text-center">Loading inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inquiries Management</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No inquiries found
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    {inquiry.status === "new" ? (
                      <Badge className="bg-tatva-teal">New</Badge>
                    ) : inquiry.status === "read" ? (
                      <Badge variant="outline">Read</Badge>
                    ) : (
                      <Badge className="bg-tatva-blue">Replied</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button 
                      variant="link" 
                      onClick={() => handleViewInquiry(inquiry)}
                      className="p-0 h-auto font-medium text-left"
                    >
                      {inquiry.subject}
                    </Button>
                  </TableCell>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>
                    {getProductName(inquiry.productId)}
                    {inquiry.subproductName && (
                      <span className="block text-xs text-muted-foreground mt-1">
                        {inquiry.subproductName}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(inquiry.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewInquiry(inquiry)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openDeleteDialog(inquiry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Inquiry Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.subject}</DialogTitle>
          </DialogHeader>
          
          <Card className="shadow-none">
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <p className="font-semibold">{selectedInquiry?.name}</p>
                  <p className="text-muted-foreground">{selectedInquiry?.email}</p>
                  <p className="text-muted-foreground">{selectedInquiry?.phone}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedInquiry?.date && formatDate(selectedInquiry.date)}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <p className="whitespace-pre-wrap">{selectedInquiry?.message}</p>
              </div>
              
              {selectedInquiry?.productId && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium">Related Product:</p>
                  <p className="text-sm text-muted-foreground">
                    {getProductName(selectedInquiry.productId)}
                    {selectedInquiry.subproductName && (
                      <span className="ml-2 font-medium">
                        - {selectedInquiry.subproductName}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            {selectedInquiry?.status !== "replied" && (
              <Button onClick={markAsReplied}>
                Mark as Replied
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Inquiry Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InquiriesPage;
