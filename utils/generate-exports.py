import os
import fnmatch
import re

def getIndexExportContent(directories, additional, aType):
    importPrefix = ''
    exportSuffix = f'export {aType}' + '{\n'
 
    for directory in directories:
        importPrefix += f'import {additional} {directory} from \'./{directory}\'\n'
        exportSuffix += f'   {directory},\n'
 
    exportSuffix += '}\n'
 
    content = f'{importPrefix}\n{exportSuffix}'
 
    return content

def createIndexExportFile(folderPath, additional, aType):
    for _, directories, _ in os.walk(folderPath):
        if len(directories) > 0:
 
            file = open(f'{folderPath}/index.ts',"w+")
 
            file.write(getIndexExportContent(directories, additional, aType))
 
            file.close()
        break

def setFolderExports(folderNames, additional = '', aType = ''):
    print('Automatic export defaults: ', folderNames)
 
    for folderName in folderNames:
        folderPath = f'../src/{folderName}'
 
        createIndexExportFile(folderPath, additional, aType)

setFolderExports([
    'utils',
    'state',
    'components/L0',
    'components/L1',
    'components/L2',
    'components/L3',
    'components/L4',
])

setFolderExports([
    'components',
    'types',
], '* as')

setFolderExports([
    'types/L0',
    'types/L1',
    'types/L2',
    'types/L3',
    'types/L4',
], '', 'type ')