#!/usr/bin/python

version = '1.1.1'
module = 'EISEN'
input_path = 'src/'
output_path = 'build/eisenscript.js'
input_order = [
  
]

import re, os, sys, time, tempfile

header = '''/*
 * eisenscript v%s
 * https://github.com/after12am/eisenscript
 * (c)2013 Satoshi Okami
 * Released under the MIT license
 */
'''

def sources():
    return input_order + [os.path.join(base, f) for base, folders, files in \
        os.walk(input_path) for f in files if f.endswith('.js') and not os.path.join(base, f) in input_order]

def compile(sources):
    return '\n'.join('// %s\n%s' % (path, open(path).read()) for path in sources)

def compress(text):
    def compress(match):
        text = match.group(0)
        if '  ' in text: # assume all strings with two consecutive spaces are glsl
            text = re.sub('/\*.*?\*/', '', text) # remove all comments
            text = re.sub(' +', ' ', text) # replace consecutive spaces with one space
            text = re.sub(r' ?(\+|\-|\*|/|,|=|{|}|;|\(|\)|<|>|!|\'|\") ?', r'\1', text) # tighten spaces around some tokens
        return text
    text = re.sub(r"('([^'\\]|\\(.|\n))*'|\"([^\"\\]|\\(.|\n))*\")", compress, text) # replace all strings
    return text

def release(data):
    f1, temp1_path = tempfile.mkstemp()
    f2, temp2_path = tempfile.mkstemp()
    os.write(f1, data)
    os.close(f1)
    os.close(f2)
    os.system('java -jar /usr/local/bin/closure --js %s --js_output_file %s' % (temp1_path, temp2_path))
    os.remove(temp1_path)
    data = open(temp2_path).read()
    os.remove(temp2_path)
    return compress(data)

def build():
    data = 'var %s = (function() {\nvar exports = {};\nexports.version=\'%s\'\n\n' % (module, version) + compile(sources()) + '\nreturn exports;\n})();\n'
    if 'release' in sys.argv:
        data = release(data)
    open(output_path, 'w').write(header % version + data)
    print 'built %s (%u lines)' % (output_path, len(data.split('\n')))

def stat():
    return [os.stat(file).st_mtime for file in sources()]

def monitor():
    a = stat()
    while True:
        time.sleep(0.5)
        b = stat()
        if a != b:
            a = b
            build()

if __name__ == '__main__':
    build()
    if 'debug' in sys.argv:
        monitor()