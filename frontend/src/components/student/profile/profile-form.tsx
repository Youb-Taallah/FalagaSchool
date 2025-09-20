import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Edit2, Camera, CheckCircle, LogOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Avatar } from '../../ui/avatar';
import { AvatarSelector } from './avatar-selector';
import { Student } from '../../../types/student';
import { getInitials } from '../../utils';
import { useAuthStore } from '../../../stores/authStore';
import { useAuth } from '@clerk/clerk-react';
import useStudentStore from '../../../stores/student/studentStore';
import { updateStudent } from '../../../services/studentService';

type ProfileFormValues = {
  name: string;
  phone: string;
  city: string;
  educationLevel: string;
};

const EDUCATION_LEVELS = [
  'High School',
  'Associate Degree',
  'Bachelor Degree',
  'Master Degree',
  'Doctorate',
  'Other'
];

export function ProfileForm() {
  const {currentStudent} = useStudentStore();
  const updateStudentDetails = useStudentStore(state => state.updateStudentDetails);
  const setCurrentStudent = useStudentStore(state => state.setCurrentStudent);
  const { currentUser, signOut } = useAuthStore();
  const { signOut: clerkSignOut, getToken } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ProfileFormValues>({
    defaultValues: {
      name: currentStudent?.name || '',
      phone: currentStudent?.phone || '',
      city: currentStudent?.city || '',
      educationLevel: currentStudent?.educationLevel || '',
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {

    console.log(currentStudent?._id);
    

    if (!currentStudent?._id) return;
    
    setIsSubmitting(true);
    try {
      const token = await getToken();
      if (!token) return;
      
      const response = await updateStudent(token, currentStudent._id, data);
      
      if (response.success) {
        // Update local store with new data
        updateStudentDetails(data as Partial<Student>);
        setIsEditing(false);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to update student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = async (avatarUrl: string) => {
    if (!currentStudent?._id) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const response = await updateStudent(token, currentStudent._id, { avatar: avatarUrl });
      
      if (response.success) {
        updateStudentDetails({ avatar: avatarUrl });
        setShowAvatarSelector(false);
      }
    } catch (error) {
      console.error('Failed to update avatar:', error);
    }
  };

  const handleLogout = async () => {
    setCurrentStudent(null);
    signOut();
    await clerkSignOut();
  };

  const handleEditCancel = () => {
    // Reset form to original values
    reset({
      name: currentStudent?.name || '',
      phone: currentStudent?.phone || '',
      city: currentStudent?.city || '',
      educationLevel: currentStudent?.educationLevel || '',
    });
    setIsEditing(false);
  };

  const profileData = currentStudent;

  return (
    <div className="space-y-6">
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="border-b-0">
          <div className="flex justify-between items-center">
            <CardTitle>My Profile</CardTitle>
            {!isEditing && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                leftIcon={<Edit2 size={16} />}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:mr-16 space-y-3 mb-10">
              <div className="relative">
                <Avatar 
                  src={profileData?.avatar} 
                  initials={getInitials(profileData?.name || '')}
                  className="w-28 h-28 text-2xl"
                />
                <button 
                  className="absolute -right-1 bottom-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setShowAvatarSelector(true)}
                >
                  <Camera size={16} />
                </button>
              </div>
              <div className="text-center">
                <h3 className="font-medium">{profileData?.name}</h3>
                <p className="text-sm text-gray-500">
                  Status: <span className={profileData?.status === 'active' ? 'text-green-500' : 'text-red-500'}>
                    {profileData?.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Full Name"
                      {...register('name', { required: 'Name is required' })}
                      error={errors.name?.message}
                    />
                    <Input
                      label="Email Address"
                      value={currentUser?.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <Input
                      label="Phone Number"
                      {...register('phone')}
                    />
                    <Input
                      label="City"
                      {...register('city')}
                    />
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Education Level</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                        {...register('educationLevel')}
                        defaultValue={currentStudent?.educationLevel || ''}
                      >
                        <option value="">Select education level</option>
                        {EDUCATION_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleEditCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isDirty || isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ProfileField label="Full Name" value={profileData?.name || ''} />
                    <ProfileField label="Email Address" value={currentUser?.email || ''} />
                    <ProfileField label="Phone Number" value={profileData?.phone || ''} />
                    <ProfileField label="City" value={profileData?.city || ''} />
                    <ProfileField label="Education Level" value={profileData?.educationLevel || ''} />
                    <ProfileField 
                      label="Member Since" 
                      value={currentUser?.createdAt.toString() || ''}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        {updateSuccess && (
          <CardFooter className="bg-green-50 text-green-800 py-3 flex gap-2 items-center">
            <CheckCircle size={16} />
            <span className="text-sm">Profile updated successfully!</span>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg p-4 text-white">
              <h4 className="text-lg font-semibold">Enrolled Courses</h4>
              <p className="text-3xl font-bold mt-2">{profileData?.enrolledCourses?.length || 0}</p>
            </div>
            <div className="bg-gradient-to-br from-red-300 to-red-500 rounded-lg p-4 text-white">
              <h4 className="text-lg font-semibold">Individual Chapters</h4>
              <p className="text-3xl font-bold mt-2">{profileData?.enrolledChapters?.length || 0}</p>
            </div>
            <div className="bg-gradient-to-br from-green-300 to-green-500 rounded-lg p-4 text-white">
              <h4 className="text-lg font-semibold">Purchased Books</h4>
              <p className="text-3xl font-bold mt-2">{profileData?.boughtBooks?.length || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
              {/* <div className="border-t border-gray-200 pt-4 mt-4"> */}
              <div className='py-4'>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                >
                  Log Out
                </Button>
              </div>
        </CardContent>
      </Card>

      {showAvatarSelector && (
        <div className="fixed top-[-24px] left-0 w-full h-full flex items-center justify-center bg-black/50 z-50 m-0">
          <div className="w-full max-w-md mx-auto">
            <AvatarSelector
              currentAvatar={profileData?.avatar}
              onSelect={handleAvatarChange}
              onCancel={() => setShowAvatarSelector(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500 ">{label}</p>
      <p className="text-gray-900">{value || 'Not provided'}</p>
    </div>
  );
}