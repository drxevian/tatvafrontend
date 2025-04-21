import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Eye, Trash2, MailCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getContactSubmissions, 
  updateContactSubmissionStatus, 
  deleteContactSubmission,
  type ContactSubmission
} from "@/utils/contactSubmissions";

const ContactSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getContactSubmissions();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching contact submissions:", error);
        toast({
          title: "Failed to load submissions",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmissions();
  }, [toast]);

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const handleViewSubmission = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    
    // Mark as read if it's new
    if (submission.status === "new") {
      try {
        const updated = await updateContactSubmissionStatus(submission.id, "read");
        if (updated) {
          const updatedSubmissions = await getContactSubmissions();
          setSubmissions(updatedSubmissions);
        }
      } catch (error) {
        console.error("Error updating submission status:", error);
      }
    }
    
    setViewDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (submissionToDelete) {
      try {
        const deleted = await deleteContactSubmission(submissionToDelete);
        
        if (deleted) {
          const updatedSubmissions = await getContactSubmissions();
          setSubmissions(updatedSubmissions);
          setDeleteDialogOpen(false);
          setSubmissionToDelete(null);
          
          toast({
            title: "Submission deleted",
            description: "The contact submission has been successfully deleted.",
          });
        }
      } catch (error) {
        console.error("Error deleting submission:", error);
        toast({
          title: "Error deleting submission",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const openDeleteDialog = (submissionId: string) => {
    setSubmissionToDelete(submissionId);
    setDeleteDialogOpen(true);
  };
  
  const markAsReplied = async () => {
    if (selectedSubmission) {
      try {
        const updated = await updateContactSubmissionStatus(selectedSubmission.id, "replied");
        
        if (updated) {
          const updatedSubmissions = await getContactSubmissions();
          setSubmissions(updatedSubmissions);
          toast({
            title: "Marked as replied",
            description: "The contact submission has been marked as replied.",
          });
          
          setViewDialogOpen(false);
        }
      } catch (error) {
        console.error("Error marking submission as replied:", error);
        toast({
          title: "Error updating submission",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contact Form Submissions</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
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
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No contact submissions found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    {submission.status === "new" ? (
                      <Badge className="bg-tatva-teal">New</Badge>
                    ) : submission.status === "read" ? (
                      <Badge variant="outline">Read</Badge>
                    ) : (
                      <Badge className="bg-tatva-blue">Replied</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button 
                      variant="link" 
                      onClick={() => handleViewSubmission(submission)}
                      className="p-0 h-auto font-medium text-left"
                    >
                      {submission.subject}
                    </Button>
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{formatDate(submission.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewSubmission(submission)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openDeleteDialog(submission.id)}
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

      {/* View Submission Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedSubmission?.subject}</DialogTitle>
          </DialogHeader>
          
          <Card className="shadow-none">
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <p className="font-semibold">{selectedSubmission?.name}</p>
                  <p className="text-muted-foreground">{selectedSubmission?.email}</p>
                  <p className="text-muted-foreground">{selectedSubmission?.phone}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedSubmission?.date && formatDate(selectedSubmission.date)}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <p className="whitespace-pre-wrap">{selectedSubmission?.message}</p>
              </div>
            </CardContent>
          </Card>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            {selectedSubmission?.status !== "replied" && (
              <Button onClick={markAsReplied}>
                <MailCheck className="mr-2 h-4 w-4" />
                Mark as Replied
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Submission Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact submission? This action cannot be undone.
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

export default ContactSubmissionsPage;
