from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC, SVC
from sklearn.utils import shuffle
import _pickle as cPickle
import numpy as np
import pandas as pd

# def count_vectorize()

SPLIT_LENGTH = 200
AUTHORS = ["cicero", "caesar", "nepos", "lucretius", "livy", "ovid", "horace", "vergil", "hyginus", "martial",
           "juvenal", "tacitus", "lucan", "quintilian", "sen", "statius", "silius", "columella"]

# Utils Start

from cltk.corpus.utils.importer import CorpusImporter
from cltk.stem.latin.j_v import JVReplacer
from cltk.tokenize.word import WordTokenizer
from cltk.stem.lemma import LemmaReplacer
import re


def remove_numbers(text):
    for i in range(10):
        text = text.replace(str(i), "")
    return text


def remove_latin_library_items(text):
    # text : String
    assert (type(text) == str), "text must be a string"
    # regex = re.compile(".*?\((.*?)\)")
    # text = re.findall(regex, text)
    brackets_removed = re.sub("[\(\[].*?[\)\]]", "", text)
    # print("+" * 50, brackets_removed, "=" * 50)
    digits_removed = remove_numbers(brackets_removed)
    dash_removed = digits_removed.replace("-", "")
    split = dash_removed.split(" ")
    # cropped = split[15:-15]
    cropped = split # no need to crop since not from latin library
    joined = " ".join(cropped)
    return joined
    # text = text.strip()


def split_count(s, count):
    split = s.split(" ")
    return [" ".join(split[i: i + count]) for i in range(0, len(split), count)]


def preprocess(doc):
    assert (type(doc) == str)
    word_tokenizer = WordTokenizer('latin')
    doc_word_tokens = word_tokenizer.tokenize(doc)
    doc_word_tokens_no_punt = [token.lower() for token in doc_word_tokens if token not in ['.', ',', ':', ';']]

    # lemmeatization
    corpus_importer = CorpusImporter('latin')
    corpus_importer.import_corpus('latin_models_cltk')
    jv_replacer = JVReplacer()

    lemmatizer = LemmaReplacer('latin')
    lemmata = lemmatizer.lemmatize(" ".join(doc_word_tokens_no_punt))
    cleaned = remove_latin_library_items(" ".join(lemmata))
    return cleaned


### Utils End ###

def get_df_for_author(author, period):
    texts_df = pd.DataFrame(columns=["author", "text"])
    i = 0
    type_dirs = {period: ["./" + author]}
    docs = load_docs([period], type_dirs=type_dirs)
    cleaned_docs = []
    for doc in docs:
        cleaned_docs.append(remove_latin_library_items(preprocess(doc)))
    rows = []
    for i, cleaned_doc in enumerate(cleaned_docs):
        split_docs = split_count(cleaned_doc, SPLIT_LENGTH)  # splits into 50 word chuncks
        for split_doc in split_docs:
            cur_doc = {"author": author, "text": split_doc}
            rows.append(cur_doc)
        # texts_df[i] = [period, cleaned_doc]
        # print(i, cleaned_doc)
    texts_df = pd.DataFrame(rows)
    return texts_df


def get_text_by_authors(authors):
    frames = []
    for author, period in authors:
        cur_df = get_df_for_author(author, period)
        frames.append(cur_df)

    combined_frames = pd.concat(frames)
    return combined_frames


def load_model(filename):
    with open(filename + ".pkl", "rb") as fid:
        model = cPickle.load(fid)
        return model


def classify_text(text):
    model_filename = "./saved_models/SVC-testA_2"
    model = load_model(model_filename)

    text = remove_latin_library_items(preprocess(text))
    # print(text)
    chunks = split_count(text, SPLIT_LENGTH)

    results = []

    bow_transformer_filename = "bow_transformer_2"
    bow_transformer = load_model(bow_transformer_filename)

    chunks = bow_transformer.transform(chunks)
    for chunk in chunks:
        cur_pred = model.predict_proba(chunk)
        results.append(cur_pred)

    results = np.asarray(results)
    # only one result
    if results.shape[0] == 1:
        results = np.squeeze(results)
        return results
    results = np.squeeze(results)
    averages = results.mean(0)
    return averages


if __name__ == "__main__":
    # main()
    text = "ruerint Danai, quaeque ipse miserrima vidi 5 et quorum pars magna fui. quis talia fando Myrmidonum Dolopumve aut duri miles Ulixi temperet a lacrimis? et iam nox umida caelo praecipitat suadentque cadentia sidera somnos. sed si tantus amor casus cognoscere nostros               10 et breviter Troiae supremum audire laborem, quamquam animus meminisse horret luctuque refugit, incipiam. fracti bello fatisque repulsi ductores Danaum tot iam labentibus annis instar montis equum divina Palladis arte               15 aedificant, sectaque intexunt abiete costas; votum pro reditu simulant; ea fama vagatur. huc delecta virum sortiti corpora furtim includunt caeco lateri penitusque cavernas ingentis uterumque armato milite complent.               20 est in conspectu Tenedos, notissima fama insula, dives opum Priami dum regna manebant, nunc tantum sinus et statio male fida carinis: huc se provecti deserto in litore condunt; nos abiisse rati et vento petiisse Mycenas.               25 ergo omnis longo soluit se Teucria luctu; panduntur portae, iuvat ire et Dorica castra desertosque videre locos litusque relictum: hic Dolopum manus, hic saevus tendebat Achilles; classibus hic locus, hic acie certare solebant.               30 pars stupet innuptae donum exitiale Minervae et molem mirantur equi; primusque Thymoetes duci intra muros hortatur et arce locari, sive dolo seu iam Troiae sic fata ferebant. at Capys, et quorum melior sententia menti,               35 aut pelago Danaum insidias suspectaque dona praecipitare iubent subiectisque urere flammis, aut terebrare cavas uteri et temptare latebras. scinditur incertum studia in contraria vulgus. Primus ibi ante omnis magna comitante caterv"
    classify_text(text)
