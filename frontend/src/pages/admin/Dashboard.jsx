import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchRSVPs, 
  deleteRSVP, 
  updateRSVP,
  submitRSVP,
  updateRSVPStatus
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
  Plus,
  Clock
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
    guests: [{ name: '', foodPreference: '', attendingAnandKaraj: true, attendingReception: true, isChild: false, age: '' }]
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
        guests: [{ name: '', foodPreference: '', attendingAnandKaraj: true, attendingReception: true }]
      });
      loadData();
    } catch (error) {
      toast.error(error.message || 'Failed to add guest');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateRSVPStatus(id, status);
      toast.success(`RSVP ${status} and confirmation sent if applicable`);
      loadData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredRsvps = rsvps.filter(rsvp => 
    rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rsvp.guests.some(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    totalRsvps: rsvps.length,
    totalGuests: rsvps.reduce((acc, curr) => acc + curr.guests.length, 0),
    anandKaraj: rsvps.reduce((acc, rsvp) => acc + rsvp.guests.filter(g => g.attendingAnandKaraj).length, 0),
    reception: rsvps.reduce((acc, rsvp) => acc + rsvp.guests.filter(g => g.attendingReception).length, 0),
    children: rsvps.reduce((acc, rsvp) => acc + rsvp.guests.filter(g => g.isChild).length, 0),
    dietary: rsvps.flatMap(rsvp => rsvp.guests)
                  .filter(g => g.foodPreference && g.foodPreference.trim() !== '')
                  .map(g => ({ name: g.name, restriction: g.foodPreference }))
  };

  if (loading) return <div className="p-8 text-center text-[#2A0306]">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-serif text-[#2A0306]">Admin Dashboard</h1>
          <p className="text-[#2A0306]/60 text-lg">Manage your wedding guest list and entries</p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-[#A16C56] text-white hover:bg-[#A16C56]/90 shadow-md" 
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
          <Button 
            variant="outline" 
            className="border-red-200 text-red-600 hover:bg-red-50 bg-white shadow-sm" 
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-white/80 border-[#A16C56]/20 shadow-sm col-span-1">
              <CardHeader className="p-4">
                <CardTitle className="text-xs font-medium text-[#2A0306]/70 uppercase tracking-wider">Entries</CardTitle>
                <div className="text-3xl font-bold text-[#2A0306]">{stats.totalRsvps}</div>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border-[#A16C56]/20 shadow-sm col-span-1">
              <CardHeader className="p-4">
                <CardTitle className="text-xs font-medium text-[#2A0306]/70 uppercase tracking-wider">Total Guests</CardTitle>
                <div className="text-3xl font-bold text-[#A16C56]">{stats.totalGuests}</div>
              </CardHeader>
            </Card>
            <Card className="bg-green-50/50 border-green-200 shadow-sm col-span-1">
              <CardHeader className="p-4">
                <CardTitle className="text-xs font-medium text-green-700 uppercase tracking-wider">Anand Karaj</CardTitle>
                <div className="text-3xl font-bold text-green-900">{stats.anandKaraj}</div>
              </CardHeader>
            </Card>
            <Card className="bg-blue-50/50 border-blue-200 shadow-sm col-span-1">
              <CardHeader className="p-4">
                <CardTitle className="text-xs font-medium text-blue-700 uppercase tracking-wider">Reception</CardTitle>
                <div className="text-3xl font-bold text-blue-900">{stats.reception}</div>
              </CardHeader>
            </Card>
            <Card className="bg-orange-50/50 border-orange-200 shadow-sm col-span-1">
              <CardHeader className="p-4">
                <CardTitle className="text-xs font-medium text-orange-700 uppercase tracking-wider">Children</CardTitle>
                <div className="text-3xl font-bold text-orange-900">{stats.children}</div>
              </CardHeader>
            </Card>
          </div>

          {/* Dietary Overview */}
          {stats.dietary.length > 0 && (
            <Card className="border-red-100 bg-red-50/20 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif text-[#2A0306] flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                  Dietary Requirements Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stats.dietary.map((d, i) => (
                    <div key={i} className="flex flex-col p-3 bg-white border border-red-100 rounded-lg shadow-sm">
                      <span className="font-semibold text-sm text-[#2A0306]">{d.name}</span>
                      <span className="text-xs text-red-600 italic mt-1 font-medium">{d.restriction}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* RSVP Table */}
          <Card className="border-[#A16C56]/20 shadow-xl overflow-hidden bg-white/95">
            <CardHeader className="bg-white border-b border-[#A16C56]/10 py-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="relative flex-1 w-full max-w-md">
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
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#E5E1C7]/10">
                  <TableRow>
                    <TableHead className="w-[100px] text-[#2A0306]/70">Date</TableHead>
                    <TableHead className="w-[180px] text-[#2A0306]/70 hidden md:table-cell">Email</TableHead>
                    <TableHead className="text-[#2A0306]/70">Guests & Attendance</TableHead>
                    <TableHead className="text-[#2A0306]/70 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRsvps.map((rsvp) => (
                    <TableRow key={rsvp._id} className="hover:bg-[#E5E1C7]/5 transition-colors">
                      <TableCell className="text-[10px] md:text-xs text-[#2A0306]/50">
                        {new Date(rsvp.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </TableCell>
                      <TableCell className="font-medium text-[#2A0306] text-sm break-all hidden md:table-cell">{rsvp.email}</TableCell>
                      <TableCell>
                        <div className="space-y-3 py-2">
                          {rsvp.guests.map((g, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                               <div className="min-w-[120px] font-medium flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-[#A16C56]" />
                                  <span>{g.name}</span>
                                  {g.isChild && (
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 text-[8px] h-3 px-1">
                                      CHILD
                                    </Badge>
                                  )}
                               </div>
                               <div className="flex gap-2">
                                  <Badge variant="outline" className={`${g.attendingAnandKaraj ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'} text-[9px] px-1.5 py-0`}>
                                    AK
                                  </Badge>
                                  <Badge variant="outline" className={`${g.attendingReception ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-400 border-gray-200'} text-[9px] px-1.5 py-0`}>
                                    REC
                                  </Badge>
                               </div>
                               {g.foodPreference && (
                                 <div className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                    {g.foodPreference}
                                 </div>
                               )}
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
                      <TableCell colSpan={4} className="h-32 text-center text-[#2A0306]/40">
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit RSVP - {editingRsvp?.email}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={editingRsvp?.email || ''} 
                onChange={(e) => setEditingRsvp({...editingRsvp, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-4">
              <Label className="text-lg font-serif">Guests</Label>
              <div className="space-y-4">
                {editingRsvp?.guests.map((guest, idx) => (
                  <Card key={idx} className="p-4 border-[#A16C56]/10">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input 
                            value={guest.name} 
                            onChange={(e) => {
                              const newGuests = [...editingRsvp.guests];
                              newGuests[idx].name = e.target.value;
                              setEditingRsvp({...editingRsvp, guests: newGuests});
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Food Preference</Label>
                          <Input 
                            value={guest.foodPreference} 
                            onChange={(e) => {
                              const newGuests = [...editingRsvp.guests];
                              newGuests[idx].foodPreference = e.target.value;
                              setEditingRsvp({...editingRsvp, guests: newGuests});
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`edit-ak-${idx}`} 
                            checked={guest.attendingAnandKaraj}
                            onCheckedChange={(val) => {
                              const newGuests = [...editingRsvp.guests];
                              newGuests[idx].attendingAnandKaraj = !!val;
                              setEditingRsvp({...editingRsvp, guests: newGuests});
                            }}
                          />
                          <Label htmlFor={`edit-ak-${idx}`}>Anand Karaj</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`edit-rec-${idx}`} 
                            checked={guest.attendingReception}
                            onCheckedChange={(val) => {
                              const newGuests = [...editingRsvp.guests];
                              newGuests[idx].attendingReception = !!val;
                              setEditingRsvp({...editingRsvp, guests: newGuests});
                            }}
                          />
                          <Label htmlFor={`edit-rec-${idx}`}>Reception</Label>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100 flex gap-6 items-center">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`edit-child-${idx}`} 
                            checked={guest.isChild}
                            onCheckedChange={(val) => {
                              const newGuests = [...editingRsvp.guests];
                              newGuests[idx].isChild = !!val;
                              setEditingRsvp({...editingRsvp, guests: newGuests});
                            }}
                          />
                          <Label htmlFor={`edit-child-${idx}`}>Is Child?</Label>
                        </div>
                        {guest.isChild && (
                          <div className="flex items-center space-x-2">
                            <Label>Age:</Label>
                            <Input 
                              className="w-20 h-8"
                              value={guest.age || ''} 
                              onChange={(e) => {
                                const newGuests = [...editingRsvp.guests];
                                newGuests[idx].age = e.target.value;
                                setEditingRsvp({...editingRsvp, guests: newGuests});
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
            </div>
            
            <div className="space-y-4">
              <Label className="flex justify-between items-center">
                Guests List
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs text-[#A16C56]"
                  onClick={() => setNewRsvp({...newRsvp, guests: [...newRsvp.guests, {name: '', foodPreference: '', attendingAnandKaraj: true, attendingReception: true, isChild: false, age: ''}]})}
                >
                  + Add Another Guest
                </Button>
              </Label>
              {newRsvp.guests.map((guest, idx) => (
                <Card key={idx} className="p-4 border-[#A16C56]/10 relative">
                  {newRsvp.guests.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 text-red-300 hover:text-red-500"
                      onClick={() => {
                        const newGuests = newRsvp.guests.filter((_, i) => i !== idx);
                        setNewRsvp({...newRsvp, guests: newGuests});
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        value={guest.name} 
                        onChange={(e) => {
                          const newGuests = [...newRsvp.guests];
                          newGuests[idx].name = e.target.value;
                          setNewRsvp({...newRsvp, guests: newGuests});
                        }}
                        placeholder={`Guest ${idx + 1} Name`}
                      />
                      <Input 
                        value={guest.foodPreference} 
                        onChange={(e) => {
                          const newGuests = [...newRsvp.guests];
                          newGuests[idx].foodPreference = e.target.value;
                          setNewRsvp({...newRsvp, guests: newGuests});
                        }}
                        placeholder="Food Preference"
                      />
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`add-ak-${idx}`} 
                          checked={guest.attendingAnandKaraj}
                          onCheckedChange={(val) => {
                            const newGuests = [...newRsvp.guests];
                            newGuests[idx].attendingAnandKaraj = !!val;
                            setNewRsvp({...newRsvp, guests: newGuests});
                          }}
                        />
                        <Label htmlFor={`add-ak-${idx}`}>Anand Karaj</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`add-rec-${idx}`} 
                          checked={guest.attendingReception}
                          onCheckedChange={(val) => {
                            const newGuests = [...newRsvp.guests];
                            newGuests[idx].attendingReception = !!val;
                            setNewRsvp({...newRsvp, guests: newGuests});
                          }}
                        />
                        <Label htmlFor={`add-rec-${idx}`}>Reception</Label>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex gap-6 items-center">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`add-child-${idx}`} 
                          checked={guest.isChild}
                          onCheckedChange={(val) => {
                            const newGuests = [...newRsvp.guests];
                            newGuests[idx].isChild = !!val;
                            setNewRsvp({...newRsvp, guests: newGuests});
                          }}
                        />
                        <Label htmlFor={`add-child-${idx}`}>Is Child?</Label>
                      </div>
                      {guest.isChild && (
                        <div className="flex items-center space-x-2">
                          <Label>Age:</Label>
                          <Input 
                            className="w-20 h-8"
                            value={guest.age} 
                            onChange={(e) => {
                              const newGuests = [...newRsvp.guests];
                              newGuests[idx].age = e.target.value;
                              setNewRsvp({...newRsvp, guests: newGuests});
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button className="bg-[#A16C56] text-white" onClick={handleAdd}>Confirm & Add Guest</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
