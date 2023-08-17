'use client';

import { useState } from 'react';
import Image from 'next/image'
import LogoImage from '../assets/logo.svg'
import { Trash2, Stars } from 'lucide-react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-dark.css';

import { useCompletion } from 'ai/react'


export default function Home() {
  const [schema, setSchema] = useState('');
  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: 'api/generate-sql',
    body: {
      schema,
    }
  })

  function handleClearSchema(){
    setSchema('');
  }
  const result = completion;

  return (
    <div className='max-w-[430px] mx-auto px-4 pt-12 pb-4'>
      <header className='flex items-center justify-between'>
        <Image src={LogoImage} alt='AskSQL' />
        <button type='button' onClick={handleClearSchema}>
          <Trash2 className='h-8 w-8 text-snow' strokeWidth={0.8} />
        </button>
      </header>
      <form onSubmit={handleSubmit} className='py-8 w-full flex flex-col text-foam h-5/6 overflow-auto'>
        <label
          className='text-lg font-light'
          htmlFor="schema">
          Cole seu código SQL aqui
        </label>
        <div className=' max-h-[350px] overflow-auto'>
          <Editor
            textareaId='schema'
            value={schema}
            onValueChange={code => setSchema(code)}
            highlight={code => highlight(code, languages.sql, 'sql')}
            padding={16}
            textareaClassName='outline-none'
            className='my-4 h-full font-mono bg-blueberry-600 border-blueberry-300 rounded-md focus-within:ring-1 focus-within:ring-lime-600'
          />
        </div>


        <label
          className='text-lg font-light'
          htmlFor="question">
          Faça uma pergunta sobre o código:
        </label>
        <textarea
          className='my-4 bg-blueberry-600 border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-lime-600'
          name="question"
          id="question"
          value={input}
          onChange={handleInputChange}
        />

        <button
          type='submit'
          className='text-pitachio flex items-center justify-center rounded-lg border border-pitachio h-14 gap-4'>
          <Stars className="w-6 h-6" />
          Perguntar à inteligência artificial
        </button>
      </form>
      <div className='mt-6'>
        <span className='text-lg font-light text-foam'>
          Resultado:
        </span>
        <div className=' max-h-[350px] overflow-auto'>
          <textarea
            className='my-4 w-full h-40 text-foam bg-blueberry-600 border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-lime-600'
            name="question"
            id="question"
            value={result}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
