
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Folder, Plus, Search, Upload, Camera, Download } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  size?: string;
  modified: string;
  folder: string;
}

export const FileManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All Files');

  const folders = [
    { name: 'All Files', count: 24 },
    { name: 'Work Documents', count: 8 },
    { name: 'Personal', count: 6 },
    { name: 'Projects', count: 7 },
    { name: 'Archives', count: 3 }
  ];

  const recentFiles: FileItem[] = [
    { id: '1', name: 'Project Proposal.pdf', type: 'file', extension: 'PDF', size: '2.4 MB', modified: '2 hours ago', folder: 'Work Documents' },
    { id: '2', name: 'Meeting Notes.docx', type: 'file', extension: 'DOCX', size: '1.2 MB', modified: '1 day ago', folder: 'Work Documents' },
    { id: '3', name: 'Budget Analysis.xlsx', type: 'file', extension: 'XLSX', size: '856 KB', modified: '2 days ago', folder: 'Projects' },
    { id: '4', name: 'Team Photos.zip', type: 'file', extension: 'ZIP', size: '15.3 MB', modified: '1 week ago', folder: 'Personal' },
    { id: '5', name: 'Design Mockups', type: 'folder', modified: '3 days ago', folder: 'Projects' }
  ];

  const filteredFiles = recentFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'All Files' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (extension?: string) => {
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">File Manager</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Scan PDF
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {folders.map((folder) => (
          <Button
            key={folder.name}
            variant={selectedFolder === folder.name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFolder(folder.name)}
            className="justify-between"
          >
            <span className="flex items-center">
              <Folder className="w-4 h-4 mr-2" />
              {folder.name}
            </span>
            <Badge variant="secondary" className="ml-1">
              {folder.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Files</h3>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>

        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {file.type === 'folder' ? (
                  <Folder className="w-8 h-8 text-yellow-500" />
                ) : (
                  getFileIcon(file.extension)
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{file.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{file.modified}</span>
                    {file.size && (
                      <>
                        <span>•</span>
                        <span>{file.size}</span>
                      </>
                    )}
                    {file.extension && (
                      <Badge variant="outline" className="text-xs">
                        {file.extension}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
