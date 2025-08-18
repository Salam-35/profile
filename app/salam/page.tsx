'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const { files } = await res.json();
          setFiles(files);
        } else {
          toast.error('Failed to load the list of files.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching file list.');
      }
    };
    fetchFiles();
  }, []);

  const handleSelectFile = async (file: string) => {
    setSelectedFile(file);
    setIsLoading(true);
    setFileContent('');
    try {
      const res = await fetch(`/api/data/${file}`);
      if (res.ok) {
        const data = await res.json();
        setFileContent(JSON.stringify(data, null, 2));
      } else {
        toast.error(`Error fetching ${file}`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setIsSaving(true);
    try {
      JSON.parse(fileContent); // Validate JSON before sending
      const res = await fetch(`/api/data/${selectedFile}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: fileContent,
        }
      );

      if (res.ok) {
        toast.success(`${selectedFile} saved successfully!`);
      } else {
        const data = await res.json();
        toast.error(data.message || `Error saving ${selectedFile}`);
      }
    } catch (error) {
      toast.error('Invalid JSON format. Please check the content.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/salam/login');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Toaster richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="destructive">Logout</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>JSON File Editor</CardTitle>
          <CardDescription>Select a file to view and edit its content. Be careful with your changes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={handleSelectFile} disabled={isLoading || isSaving}>
            <SelectTrigger className="w-full md:w-1/3">
              <SelectValue placeholder="Select a file to edit" />
            </SelectTrigger>
            <SelectContent>
              {files.map(file => (
                <SelectItem key={file} value={file}>{file}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            value={isLoading ? 'Loading...' : fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            placeholder="Select a file to see its content here."
            readOnly={!selectedFile || isLoading}
            className="h-96 font-mono bg-gray-50 dark:bg-gray-900"
          />
          <Button onClick={handleSave} disabled={!selectedFile || isLoading || isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
