'use client';

import { python } from '@codemirror/lang-python';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { memo, useEffect, useRef } from 'react';

type CodeEditorProps = {
  content: string;
  status?: 'streaming' | 'idle';
};

function PureCodeEditor({ content, status = 'idle' }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const startState = EditorState.create({
        doc: content || '',
        extensions: [
          basicSetup,
          python(),
          EditorView.theme({
            '&': { backgroundColor: '#ffffff' },
            '.cm-content': { color: '#000000' },
            '.cm-gutters': { backgroundColor: '#f7f7f8', color: '#6b7280' },
            '.cm-activeLineGutter': { backgroundColor: '#e5e7eb' },
            '.cm-cursor': { borderLeftColor: '#000000' },
            '.cm-selectionBackground': { backgroundColor: '#e0e0e0' },
          }),
          EditorView.editable.of(false), // 読み取り専用
        ],
      });

      editorRef.current = new EditorView({
        state: startState,
        parent: containerRef.current,
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
      const currentContent = editorRef.current.state.doc.toString();

      if (status === 'streaming' || currentContent !== content) {
        const transaction = editorRef.current.state.update({
          changes: {
            from: 0,
            to: currentContent.length,
            insert: content,
          },
          annotations: [Transaction.remote.of(true)],
        });

        editorRef.current.dispatch(transaction);
      }
    }
  }, [content, status]);

  return (
    <div className="px-1">
      <div
        className="not-prose relative w-full pb-[calc(80dvh)] text-sm"
        ref={containerRef}
      />
    </div>
  );
}

function areEqual(prevProps: CodeEditorProps, nextProps: CodeEditorProps) {
  return (
    prevProps.status === nextProps.status &&
    prevProps.content === nextProps.content
  );
}

export const CodeEditor = memo(PureCodeEditor, areEqual);

