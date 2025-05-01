"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Leaf, Upload, FileSpreadsheet, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CropRecommendationPage() {
  const [formData, setFormData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 70,
    ph: 6.5,
    rainfall: 100,
  })

  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, hardcoded result
      if (formData.nitrogen > 80 && formData.phosphorus > 40 && formData.potassium > 40) {
        setResult("Rice is the best crop to be cultivated right there")
      } else if (formData.nitrogen > 60 && formData.temperature > 20) {
        setResult("Maize is the best crop to be cultivated right there")
      } else if (formData.ph < 6) {
        setResult("Cotton is the best crop to be cultivated right there")
      } else {
        setResult("Wheat is the best crop to be cultivated right there")
      }
    } catch (error) {
      setError("An error occurred while processing your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setError(null)

    if (!file) {
      setError("Please select a CSV file to upload.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // For demo purposes, hardcoded result
      setResult(
        "Bulk analysis complete. 75 samples processed. Recommended crops: Rice (45%), Maize (30%), Cotton (15%), Wheat (10%)",
      )
    } catch (error) {
      setError("An error occurred while processing your file. Please check the format and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Crop Recommendation</h1>
        <p className="text-gray-600">
          Get personalized crop recommendations based on soil composition and environmental factors.
        </p>
      </div>

      <Tabs defaultValue="single" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="single" className="flex items-center">
            <Leaf className="mr-2 h-4 w-4" />
            Single Prediction
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Bulk Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>Single Crop Recommendation</CardTitle>
              <CardDescription>
                Enter soil parameters and environmental conditions to get a personalized crop recommendation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSingleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nitrogen">Nitrogen (N) - {formData.nitrogen} kg/ha</Label>
                      <Slider
                        id="nitrogen"
                        min={0}
                        max={140}
                        step={1}
                        value={[formData.nitrogen]}
                        onValueChange={(value) => handleSliderChange("nitrogen", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phosphorus">Phosphorus (P) - {formData.phosphorus} kg/ha</Label>
                      <Slider
                        id="phosphorus"
                        min={0}
                        max={140}
                        step={1}
                        value={[formData.phosphorus]}
                        onValueChange={(value) => handleSliderChange("phosphorus", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="potassium">Potassium (K) - {formData.potassium} kg/ha</Label>
                      <Slider
                        id="potassium"
                        min={0}
                        max={140}
                        step={1}
                        value={[formData.potassium]}
                        onValueChange={(value) => handleSliderChange("potassium", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ph">pH Level - {formData.ph}</Label>
                      <Slider
                        id="ph"
                        min={0}
                        max={14}
                        step={0.1}
                        value={[formData.ph]}
                        onValueChange={(value) => handleSliderChange("ph", value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="temperature">Temperature - {formData.temperature}°C</Label>
                      <Slider
                        id="temperature"
                        min={0}
                        max={50}
                        step={0.1}
                        value={[formData.temperature]}
                        onValueChange={(value) => handleSliderChange("temperature", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="humidity">Humidity - {formData.humidity}%</Label>
                      <Slider
                        id="humidity"
                        min={0}
                        max={100}
                        step={1}
                        value={[formData.humidity]}
                        onValueChange={(value) => handleSliderChange("humidity", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rainfall">Rainfall - {formData.rainfall} mm</Label>
                      <Slider
                        id="rainfall"
                        min={0}
                        max={300}
                        step={1}
                        value={[formData.rainfall]}
                        onValueChange={(value) => handleSliderChange("rainfall", value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get Recommendation"
                  )}
                </Button>
              </form>

              {result && (
                <Alert className="mt-6 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Recommendation Result</AlertTitle>
                  <AlertDescription className="text-green-700">{result}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mt-6 bg-red-50 border-red-200" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Crop Analysis</CardTitle>
              <CardDescription>
                Upload a CSV file with multiple soil samples to get recommendations for all of them at once.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBulkSubmit} className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Upload CSV File</h3>
                  <p className="text-sm text-gray-500 mb-4">Drag and drop your CSV file here, or click to browse</p>
                  <input type="file" id="csv-upload" accept=".csv" className="hidden" onChange={handleFileChange} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("csv-upload")?.click()}
                    className="mx-auto"
                  >
                    Browse Files
                  </Button>
                  {file && <p className="mt-2 text-sm text-green-600">Selected file: {file.name}</p>}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">CSV Format Requirements</h4>
                  <p className="text-sm text-gray-600 mb-2">Your CSV file should have the following columns:</p>
                  <code className="text-xs bg-gray-100 p-2 rounded block mb-2 overflow-x-auto">
                    N,P,K,temperature,humidity,ph,rainfall
                  </code>
                  <p className="text-xs text-gray-500">Example: 90,42,43,20.87,82.00,6.50,202.93</p>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
                  disabled={isLoading || !file}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Analyze CSV Data"
                  )}
                </Button>
              </form>

              {result && (
                <Alert className="mt-6 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Analysis Complete</AlertTitle>
                  <AlertDescription className="text-green-700">{result}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mt-6 bg-red-50 border-red-200" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

