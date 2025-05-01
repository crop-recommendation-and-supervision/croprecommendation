'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/styles/tiptap.css" // optional: custom styles for the editor

export default function NewLearningTipPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const content = editor?.getHTML() || ""
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/learning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        router.push("/admin/dashboard")
      } else {
        const data = await res.json()
        setError(data.message || "Something went wrong.")
      }
    } catch (err) {
      console.error(err)
      setError("Server error.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Add Learning Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
              />
            </div>

            <div>
              <Label>Content</Label>
              <div className="border rounded p-2 min-h-[200px]">
                <EditorContent editor={editor} />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
