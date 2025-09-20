import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

interface BlankPageProps {
  title: string;
}

export function BlankPage({ title }: BlankPageProps) {
  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[300px] text-gray-500 dark:text-gray-400">
            <p>This section is under development.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}