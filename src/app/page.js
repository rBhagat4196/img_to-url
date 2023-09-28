
import ImageUploader from '../../components/ImageUploader'
import CopyToClipboard from '../../components/CopyToClipboard'
import { NavigationProvider} from '../../context/navigationContext'
export default function Home() {
  return (
    <NavigationProvider>
      <div className="flex justify-center flex-col items-center h-screen bg-gray-800">
        <div>
          <h1 className="text-center font-serif font-bold text-3xl mb-4">Image to URL</h1>
        </div>
        <div>
          <ImageUploader />
          <CopyToClipboard/>
        </div>
    </div>
    </NavigationProvider>   
  )
}
