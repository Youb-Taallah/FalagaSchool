import { ProfileForm } from '../../components/student/profile/profile-form';

export function ProfilePage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileForm />
    </div>
  );
}