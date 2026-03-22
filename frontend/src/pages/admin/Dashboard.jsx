import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchRSVPs, 
  deleteRSVP, 
  updateRSVP,
  submitRSVP
} from '../../data/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Search, 
  Trash2, 
  Edit, 
  Users, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  Download,
  Lock,
  Check,
  X,
  Plus
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingRsvp, setEditingRsvp] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRsvp, setNewRsvp] = useState({
    email: '',
    attendingAnandKaraj: true,
    attendingReception: true,
    guests: [{ name: '', foodPreference: '' }]
  });

  useEffect(() => {
    // Simple admin check
    if (sessionStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const response = await fetchRSVPs();
      setRsvps(response.data);
    } catch (error) {
      toast.error('Failed to load RSVPs');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this RSVP?')) {
      try {
        await deleteRSVP(id);
        toast.success('RSVP deleted');
        loadData();
      } catch (error) {
        toast.error('Failed to delete RSVP');
      }
    }
  };

  const handleEdit = (rsvp) => {
    setEditingRsvp({ ...rsvp });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateRSVP(editingRsvp._id, editingRsvp);
      toast.success('RSVP updated');
      setIsEditDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error('Failed to update RSVP');
    }
  };

  const handleAdd = async () => {
    try {
      if (!newRsvp.email) {
        toast.error('Email is required');
        return;
      }
      await submitRSVP(newRsvp);
      toast.success('Guest added manually. Confirmation email sent.');
      setIsAddDialogOpen(false);
      setNewRsvp({
        email: '',
        attendingAnandKaraj: true,
        attendingReception: true,
        guests: [{ name: '', foodPreference: '' }]
      });
      loadData();
    } catch (error) {
      toast.error(error.message || 'Failed to add guest');
    }
  };

  const handleToggleAttendance = async (rsvp, field) => {
    try {
      const updatedRsvp = { ...rsvp, [field]: !rsvp[field] };
      // Optimistic update
      setRsvps(prev => prev.map(r => r._id === rsvp._id ? updatedRsvp : r));
      
      await updateRSVP(rsvp._id, updatedRsvp);
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
      loadData(); // Revert on error
    }
  };

  const filteredRsvps = rsvps.filter(rsvp => 
    rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rsvp.guests.some(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    totalRsvps: rsvps.length,
    totalGuests: rsvps.reduce((acc, curr) => acc + curr.guests.length, 0),
    anandKaraj: rsvps.filter(r => r.attendingAnandKaraj).reduce((acc, curr) => acc + curr.guests.length, 0),
    reception: rsvps.filter(r => r.attendingReception).reduce((acc, curr) => acc + curr.guests.length, 0)
  };

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 mb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-serif text-[#2A0306]">Admin Dashboard</h1>
          <p className="text-[#2A0306]/60 text-lg">Manage your wedding guest list and system settings</p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-[#A16C56] text-white hover:bg-[#A16C56]/90" 
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Guest
          </Button>
          <Button 
            variant="outline" 
            className="border-red-200 text-red-600 hover:bg-red-50" 
            onClick={() => {
              sessionStorage.removeItem("isAdmin");
              navigate("/admin/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/80 border-[#A16C56]/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#2A0306]/70 uppercase tracking-wider">Total Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#2A0306]">{stats.totalRsvps}</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 border-[#A16C56]/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#2A0306]/70 uppercase tracking-wider">Confirmed Guests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#A16C56]">{stats.totalGuests}</div>
                <p className="text-xs text-[#2A0306]/50">Across all RSVPs</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50/50 border-green-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700 uppercase tracking-wider">Anand Karaj</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900">{stats.anandKaraj}</div>
                <p className="text-xs text-green-600">Guests attending</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-700 uppercase tracking-wider">Reception</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">{stats.reception}</div>
                <p className="text-xs text-blue-600">Guests attending</p>
              </CardContent>
            </Card>
          </div>

          {/* RSVP Table */}
          <Card className="border-[#A16C56]/20 shadow-xl overflow-hidden bg-white/95">
            <CardHeader className="bg-white border-b border-[#A16C56]/10 py-6">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A0306]/40" />
                  <Input 
                    placeholder="Search by email or guest name..." 
                    className="pl-10 border-[#A16C56]/20 focus:border-[#A16C56]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-[#E5E1C7]/10">{filteredRsvps.length} entries found</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-[#E5E1C7]/10">
                  <TableRow>
                    <TableHead className="w-[120px] text-[#2A0306]/70">Date</TableHead>
                    <TableHead className="w-[180px] text-[#2A0306]/70">Email</TableHead>
                    <TableHead className="text-[#2A0306]/70">Guests</TableHead>
                    <TableHead className="text-[#2A0306]/70 text-center">Anand Karaj</TableHead>
                    <TableHead className="text-[#2A0306]/70 text-center">Reception</TableHead>
                    <TableHead className="text-[#2A0306]/70 text-center">Food Preferences</TableHead>
                    <TableHead className="text-[#2A0306]/70 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRsvps.map((rsvp) => (
                    <TableRow key={rsvp._id} className="hover:bg-[#E5E1C7]/5 transition-colors">
                      <TableCell className="text-xs text-[#2A0306]/50">
                        {new Date(rsvp.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </TableCell>
                      <TableCell className="font-medium text-[#2A0306] break-all">{rsvp.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {rsvp.guests.map((g, i) => (
                            <div key={i} className="text-base flex items-center gap-2">
                               <CheckCircle className="w-3 h-3 text-[#A16C56]" />
                              <span className="truncate max-w-[150px]">{g.name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleAttendance(rsvp, 'attendingAnandKaraj')}
                          className={`hover:bg-transparent ${rsvp.attendingAnandKaraj ? 'text-green-600' : 'text-red-400'}`}
                        >
                          {rsvp.attendingAnandKaraj ? 
                            <Check className="w-6 h-6 stroke-[3px]" /> : 
                            <X className="w-6 h-6 stroke-[3px]" />
                          }
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleAttendance(rsvp, 'attendingReception')}
                          className={`hover:bg-transparent ${rsvp.attendingReception ? 'text-blue-600' : 'text-red-400'}`}
                        >
                          {rsvp.attendingReception ? 
                            <Check className="w-6 h-6 stroke-[3px]" /> : 
                            <X className="w-6 h-6 stroke-[3px]" />
                          }
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col gap-1 items-center justify-center">
                          {rsvp.guests.map((g, i) => (
                            <div key={i} className="text-sm text-[#2A0306]/60 italic">
                              {g.foodPreference || <span className="opacity-30">—</span>}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 border-[#A16C56]/20">
                            <DropdownMenuItem onClick={() => handleEdit(rsvp)} className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" /> Edit Entry
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(rsvp._id)} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-2" /> Remove Entry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRsvps.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-[#2A0306]/40">
                        No RSVPs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit RSVP - {editingRsvp?.email}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={editingRsvp?.email || ''} 
                onChange={(e) => setEditingRsvp({...editingRsvp, email: e.target.value})}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="edit-anand" 
                checked={editingRsvp?.attendingAnandKaraj}
                onCheckedChange={(val) => setEditingRsvp({...editingRsvp, attendingAnandKaraj: val})}
              />
              <Label htmlFor="edit-anand">Attending Anand Karaj</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="edit-reception" 
                checked={editingRsvp?.attendingReception}
                onCheckedChange={(val) => setEditingRsvp({...editingRsvp, attendingReception: val})}
              />
              <Label htmlFor="edit-reception">Attending Reception</Label>
            </div>

            <div className="space-y-2">
              <Label>Guests ({editingRsvp?.guests.length})</Label>
              {editingRsvp?.guests.map((guest, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input 
                    value={guest.name} 
                    onChange={(e) => {
                      const newGuests = [...editingRsvp.guests];
                      newGuests[idx].name = e.target.value;
                      setEditingRsvp({...editingRsvp, guests: newGuests});
                    }}
                    placeholder="Name"
                  />
                  <Input 
                    value={guest.foodPreference} 
                    onChange={(e) => {
                      const newGuests = [...editingRsvp.guests];
                      newGuests[idx].foodPreference = e.target.value;
                      setEditingRsvp({...editingRsvp, guests: newGuests});
                    }}
                    placeholder="Food Pref"
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-[#A16C56] text-white" onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Guest Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-[#2A0306]">Add New Guest Manually</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                placeholder="guest@example.com"
                value={newRsvp.email} 
                onChange={(e) => setNewRsvp({...newRsvp, email: e.target.value})}
              />
              <p className="text-xs text-[#2A0306]/40">A confirmation email will be sent to this address.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="add-anand" 
                  checked={newRsvp.attendingAnandKaraj}
                  onCheckedChange={(val) => setNewRsvp({...newRsvp, attendingAnandKaraj: !!val})}
                />
                <Label htmlFor="add-anand">Anand Karaj</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="add-reception" 
                  checked={newRsvp.attendingReception}
                  onCheckedChange={(val) => setNewRsvp({...newRsvp, attendingReception: !!val})}
                />
                <Label htmlFor="add-reception">Reception</Label>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex justify-between items-center">
                Guests List
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs text-[#A16C56]"
                  onClick={() => setNewRsvp({...newRsvp, guests: [...newRsvp.guests, {name: '', foodPreference: ''}]})}
                >
                  + Add Another Guest
                </Button>
              </Label>
              {newRsvp.guests.map((guest, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input 
                    className="flex-[2]"
                    value={guest.name} 
                    onChange={(e) => {
                      const newGuests = [...newRsvp.guests];
                      newGuests[idx].name = e.target.value;
                      setNewRsvp({...newRsvp, guests: newGuests});
                    }}
                    placeholder={`Guest ${idx + 1} Name`}
                  />
                  <Input 
                    className="flex-1"
                    value={guest.foodPreference} 
                    onChange={(e) => {
                      const newGuests = [...newRsvp.guests];
                      newGuests[idx].foodPreference = e.target.value;
                      setNewRsvp({...newRsvp, guests: newGuests});
                    }}
                    placeholder="Food Pref"
                  />
                  {newRsvp.guests.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-300 hover:text-red-500"
                      onClick={() => {
                        const newGuests = newRsvp.guests.filter((_, i) => i !== idx);
                        setNewRsvp({...newRsvp, guests: newGuests});
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button className="bg-[#A16C56] text-white" onClick={handleAdd}>Confirm & Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
