'use client';

import { exampleSetup } from 'prosemirror-example-setup';
import { inputRules } from 'prosemirror-inputrules';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { memo, useEffect, useRef } from 'react';
import {
  documentSchema,
  headingRule,
  buildDocumentFromContent,
  buildContentFromDocument,
} from '@/lib/editor/config';

type TextEditorProps = {
  content: string;
  status?: 'streaming' | 'idle';
};

function PureTextEditor({ content, status = 'idle' }: TextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const state = EditorState.create({
        doc: buildDocumentFromContent(content || ''),
        plugins: [
          ...exampleSetup({ schema: documentSchema, menuBar: false }),
          inputRules({
            rules: [
              headingRule(1),
              headingRule(2),
              headingRule(3),
              headingRule(4),
              headingRule(5),
              headingRule(6),
            ],
          }),
        ],
      });

      editorRef.current = new EditorView(containerRef.current, {
        state,
        editable: () => false, // 読み取り専用
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && content) {
      const currentContent = buildContentFromDocument(editorRef.current.state.doc);

      if (status === 'streaming' || currentContent !== content) {
        const newDocument = buildDocumentFromContent(content);

        const transaction = editorRef.current.state.tr.replaceWith(
          0,
          editorRef.current.state.doc.content.size,
          newDocument.content
        );

        transaction.setMeta('no-save', true);
        editorRef.current.dispatch(transaction);
      }
    }
  }, [content, status]);

  return (
    <div className="flex flex-row px-4 py-8 md:p-20">
      <div className="prose dark:prose-invert relative" ref={containerRef} />
    </div>
  );
}

function areEqual(prevProps: TextEditorProps, nextProps: TextEditorProps) {
  return (
    prevProps.status === nextProps.status &&
    prevProps.content === nextProps.content
  );
}

export const TextEditor = memo(PureTextEditor, areEqual);

