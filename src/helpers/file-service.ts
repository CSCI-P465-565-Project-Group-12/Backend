import { supabase } from '../supabaseClient.ts';


export interface FileObj{
  file: File;
}

export const uploadFilesToStorage = async (folder_id:string, images:FileObj[]) => {
  try {
      const uploads = images.map(fileObj => {
          return supabase.storage.from('Bashboss-CMS').upload(`${folder_id}/${fileObj.file.name}`, fileObj.file, {
              cacheControl: '3600',
              upsert: false
          });
      });

      const results = await Promise.all(uploads);
      const downloadUrls:string[] = images.map(fileObj =>{
        const {data} =  supabase.storage.from('Bashboss-CMS').getPublicUrl(`${folder_id}/${fileObj.file.name}`);
        return data.publicUrl as string;
      });
      console.log('results',results, downloadUrls);
      return downloadUrls;
  } catch (error) {
      console.log(error)
  }
}