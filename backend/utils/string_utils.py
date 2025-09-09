import tiktoken
import re

tokenizer_enc = tiktoken.get_encoding("cl100k_base")


def chunk_text(text: str, max_tokens: int = 200):
    text = text.replace("\n", " ").replace("\t", " ")
    text = re.sub(r'\s+', ' ', text).strip()

    sentences = re.split(r'(?<=[.!?]) +', text)

    chunks = []
    current_chunk = ""
    current_tokens = 0

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        sentence_token_len = len(tokenizer_enc.encode(sentence))

        if current_tokens + sentence_token_len <= max_tokens:
            if current_chunk:
                current_chunk += " " + sentence
            else:
                current_chunk = sentence
            current_tokens += sentence_token_len
        else:
            if current_chunk:
                chunks.append(current_chunk)

            if sentence_token_len <= max_tokens:
                current_chunk = sentence
                current_tokens = sentence_token_len
            else:
                sub_sentences = re.split(r',', sentence)
                temp_chunk = ""
                temp_tokens = 0
                for sub in sub_sentences:
                    sub = sub.strip()
                    if not sub:
                        continue
                    sub_token_len = len(tokenizer_enc.encode(sub))

                    if temp_tokens + sub_token_len + 1 <= max_tokens:
                        if temp_chunk:
                            temp_chunk += ", " + sub
                        else:
                            temp_chunk = sub
                        temp_tokens += sub_token_len + 1
                    else:
                        if temp_chunk:
                            chunks.append(temp_chunk)
                        temp_chunk = sub
                        temp_tokens = sub_token_len

                if temp_chunk:
                    chunks.append(temp_chunk)

                current_chunk = ""
                current_tokens = 0
    if current_chunk:
        chunks.append(current_chunk)

    return chunks
