# Load your usual SpaCy model (one of SpaCy English models)
import neuralcoref
import spacy
nlp = spacy.load('en_core_web_lg')

# Add neural coref to SpaCy's pipe
neuralcoref.add_to_pipe(nlp)

# You're done. You can now use NeuralCoref as you usually manipulate a SpaCy document annotations.
str1 = '''In 2019, Robert filed a case at the Federal Court in Saipan to sue Imperial Pacific International and its 
contractors, MCC International Saipan Ltd and Gold Mantis Construction Decoration, alleging forced labour and human 
trafficking claims in connection with a casino and resort construction project. The plaintiff is seeking monetary 
compensation for their pain and suffering as well as punitive damages. The case is ongoing.'''


str1.rstrip()

doc = nlp(str1)
triples = []
sub = ''
rel = ''
obj = ''

subjectTags = ['nsubj', 'nsubjpass', 'csubj', 'csubjpass',
               'agent', 'expl']
objectTags = ['dobj', 'dative', 'attr', 'oprd']
conjTags = ['conj']

for token in doc:
    #print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_, token.shape_, token.is_alpha, token.is_stop)
    #print(token.lemma_, token.pos_, token.tag_)
    pass

# for ent in doc.ents:
#     print(ent.text, ent.start_char, ent.end_char, ent.label_)
#     print(ent.text, ent.lemma_, ent.label_)
#     pass
print()


# DEPENDENCY PARSING
for chunk in doc.noun_chunks:
    print(chunk.text, '|', chunk.root.text, '|',
          chunk.root.dep_, '|', chunk.root.head.text)
    if chunk.root.dep_ in subjectTags:
        sub = chunk.text
        #rel = chunk.root.head.text
        obj = ''
    elif chunk.root.dep_ in objectTags:
        rel = chunk.root.head.text
        obj = chunk.text
        if sub:
            triples.append((sub, rel, obj))
    elif chunk.root.dep_ in conjTags:
        if rel and sub:
            triples.append((sub, rel, chunk.text))
    elif chunk.root.dep_ == 'pobj':
        if sub and rel:
            triples.append((obj, chunk.root.head.text, chunk.text))
print()
for x in triples:
    print(x)
print()

# COREF RESOLUTION
for x in doc._.coref_clusters:
    print(x)
