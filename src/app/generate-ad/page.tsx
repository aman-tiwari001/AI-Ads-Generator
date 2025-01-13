'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Upload, Video } from 'lucide-react'

export default function CreateAdPage() {
  const [adScript, setAdScript] = useState('')
  const [creator, setCreator] = useState('')
  const [resolution, setResolution] = useState('')
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('')

  const handleScriptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAdScript(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaFiles(event.target.files)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a video being generated
    setTimeout(() => {
      setGeneratedVideoUrl('/placeholder.svg?height=720&width=1280')
    }, 2000)
  }

  return (
    <div className="min-h-screen mt-[60px] overflow-y-hidden bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Create Your AI-Powered Video Ad
        </h1>
        <div className="flex justify-center flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="script">Ad Script</Label>
                <Textarea
                  id="script"
                  placeholder="Write your ad script here..."
                  value={adScript}
                  rows={7}
                  onChange={(e) => setAdScript(e.target.value)}
                  className=" bg-gray-800 text-white"
                />
                <div className="mt-2">
                  <Label htmlFor="scriptUpload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Script
                  </Label>
                  <Input
                    id="scriptUpload"
                    type="file"
                    accept=".txt"
                    onChange={handleScriptUpload}
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="creator">Creator</Label>
                <Select onValueChange={setCreator}>
                  <SelectTrigger className='bg-gray-800 text-white'>
                    <SelectValue placeholder="Select a creator" />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 text-white'>
                    <SelectItem value="ai_model_1">AI Model 1</SelectItem>
                    <SelectItem value="ai_model_2">AI Model 2</SelectItem>
                    <SelectItem value="ai_model_3">AI Model 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mediaUpload">Media Files</Label>
                <Input
                  id="mediaUpload"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="bg-gray-800 text-white"
                />
              </div>
              <div>
                <Label htmlFor="resolution">Resolution</Label>
                <Select onValueChange={setResolution} defaultValue='4k'>
                  <SelectTrigger className='bg-gray-800 text-white'>
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 text-white'>
                    <SelectItem value="4k">4K</SelectItem>
                    <SelectItem value="uhd">UHD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Generate Ad
              </Button>
            </form>
          </div>
          
          <div className="w-full lg:w-1/2 mt-6">
            <div className="bg-gray-950 rounded-lg overflow-hidden aspect-video">
              {generatedVideoUrl ? (
                <video 
                  src={generatedVideoUrl} 
                  controls 
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-950">
                  <Video className="w-16 h-16 text-gray-400" />
                  <p className="ml-4 text-gray-400">Your generated video will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}