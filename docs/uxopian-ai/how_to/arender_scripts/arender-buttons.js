// Buttons of the ARender top panel (Scripts > arender-buttons). Publish, reload the document: done.
//
//   uxoai.addMenu({ title, items })                          a dropdown in the top panel
//   uxoai.addButton({ title, icon, run })                    a single button in the top panel
//   uxoai.promptItem(label, promptId, payload, options)      menu entry sending a prompt to the chat
//   uxoai.chatItem(label, promptId, payload, options)        menu entry opening the chat with a prompt as context
//
// payload receives { documentId, documentIds }: the current document and the documents of the layout.
// options: { icon: ARender icon class, multiDocument: true to enable only when several documents are open }.

uxoai.addMenu({
    title: 'Uxopian AI',
    items: [
        uxoai.promptItem('Summarize in text format', 'summarizeDocumentText', function (doc) {
            return { documentId: doc.documentId };
        }),
        uxoai.promptItem('Summarize in MD format', 'summarizeDocumentMarkdown', function (doc) {
            return { documentId: doc.documentId };
        }),
        uxoai.promptItem('Detailed comparison', 'detailedComparison', function (doc) {
            return { documentType: 'documentation', documentIds: doc.documentIds };
        }, { icon: 'icon-compare', multiDocument: true }),
        uxoai.promptItem('Generic comparison', 'genericComparison', function (doc) {
            return { language: 'french', leftDocumentId: doc.documentIds[0], rightDocumentId: doc.documentIds[1] };
        }, { icon: 'icon-compare', multiDocument: true }),
        uxoai.promptItem('Translate in french', 'translate', function (doc) {
            return { language: 'french', documentId: doc.documentId };
        }, { icon: 'icon-text' }),
        uxoai.promptItem('Translate in english', 'translate', function (doc) {
            return { language: 'english', documentId: doc.documentId };
        }, { icon: 'icon-text' }),
        uxoai.chatItem('Open chat with AI', 'arenderContext', function (doc) {
            return { documentId: doc.documentId };
        }, { icon: 'icon-send' })
    ]
});
